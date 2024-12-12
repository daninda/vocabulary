import { IDictionaryEntryRepository } from '@application/repositories/dictionary-entry.interface';
import { DictionaryEntry } from '@domain/dictionary-entry';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DictionaryEntryEntity } from '@postgres/entities/dictionary-entry';
import { getPartOfSpeech } from '@shared/types/parts-of-speech';
import { LessThan, Repository } from 'typeorm';

@Injectable()
export class DictionaryEntryRepository implements IDictionaryEntryRepository {
  constructor(
    @InjectRepository(DictionaryEntryEntity)
    private dictionaryEntryRepository: Repository<DictionaryEntryEntity>,
  ) {}

  async save(dictionaryEntry: DictionaryEntry): Promise<DictionaryEntry> {
    const dictionaryEntryEntity = this.toDictionaryEntryEntity(dictionaryEntry);

    const res = await this.dictionaryEntryRepository.save({
      ...dictionaryEntryEntity,
      dictionary: { id: dictionaryEntry.dictionaryId },
    });
    return this.toDictionaryEntry(res);
  }

  async findAll(dictionary_id: string): Promise<DictionaryEntry[]> {
    const res = await this.dictionaryEntryRepository.find({
      relations: ['dictionary'],
      where: { dictionary: { id: dictionary_id } },
    });

    return res.map((dictionaryEntry) =>
      this.toDictionaryEntry(dictionaryEntry),
    );
  }

  async findById(id: string): Promise<DictionaryEntry | null> {
    const res = await this.dictionaryEntryRepository.findOne({
      relations: ['dictionary'],
      where: { id: id },
    });

    return res ? this.toDictionaryEntry(res) : null;
  }

  async deleteById(id: string): Promise<void> {
    await this.dictionaryEntryRepository.delete({ id: id });
    return;
  }

  async changeDictionary(
    id: string,
    dictionaryId: string,
  ): Promise<DictionaryEntry> {
    await this.dictionaryEntryRepository.update(
      { id: id },
      { dictionary: { id: dictionaryId } },
    );

    const res = await this.findById(id);
    return res;
  }

  async changeRating(id: string, rating: number): Promise<DictionaryEntry> {
    const dictionaryEntry = await this.findById(id);
    dictionaryEntry.changeRating(rating);
    const res = await this.save(dictionaryEntry);
    return res;
  }

  async findForTestByDictionary(
    dictionaryId: string,
  ): Promise<DictionaryEntry | null> {
    const date = new Date(new Date().getTime() - 1000 * 60 * 1);

    const res = await this.dictionaryEntryRepository.findOne({
      relations: ['dictionary'],
      where: {
        dictionary: { id: dictionaryId },
        rating: LessThan(3),
        updateAt: LessThan(date),
      },
      order: {
        rating: 'ASC',
      },
    });

    if (!res) {
      return null;
    }

    return this.toDictionaryEntry(res);
  }

  async findForTest(userId: string): Promise<DictionaryEntry | null> {
    const date = new Date(new Date().getTime() - 1000 * 60 * 60 * 24);

    const res = await this.dictionaryEntryRepository.findOne({
      relations: ['dictionary'],
      where: {
        rating: LessThan(3),
        dictionary: {
          user: { id: userId },
        },
        updateAt: LessThan(date),
      },
      order: {
        rating: 'ASC',
      },
    });

    if (!res) {
      return null;
    }

    return this.toDictionaryEntry(res);
  }

  private toDictionaryEntryEntity(
    dictionaryEntry: DictionaryEntry,
  ): DictionaryEntryEntity {
    const dictionaryEntryEntity = new DictionaryEntryEntity();
    dictionaryEntryEntity.id = dictionaryEntry.id;
    dictionaryEntryEntity.word = dictionaryEntry.word;
    dictionaryEntryEntity.pos = dictionaryEntry.pos;
    dictionaryEntryEntity.rating = dictionaryEntry.rating;
    dictionaryEntryEntity.tr_word = dictionaryEntry.translated.word;
    dictionaryEntryEntity.tr_pos = dictionaryEntry.translated.pos;
    dictionaryEntryEntity.tr_synonims =
      dictionaryEntry.translated.synonims?.join(',');
    dictionaryEntryEntity.tr_means =
      dictionaryEntry.translated.means?.join(',');
    dictionaryEntryEntity.tr_example =
      dictionaryEntry.translated.example?.text +
      '/' +
      dictionaryEntry.translated.example?.translated;
    dictionaryEntryEntity.createAt = dictionaryEntry.createAt;
    dictionaryEntryEntity.updateAt = dictionaryEntry.updateAt;
    return dictionaryEntryEntity;
  }

  private toDictionaryEntry(
    dictionaryEntryEntity: DictionaryEntryEntity,
  ): DictionaryEntry {
    const dictionaryEntry = new DictionaryEntry(
      dictionaryEntryEntity.id,
      dictionaryEntryEntity.dictionary.id,
      dictionaryEntryEntity.word,
      getPartOfSpeech(dictionaryEntryEntity.pos),
      {
        word: dictionaryEntryEntity.tr_word,
        pos: dictionaryEntryEntity.tr_pos,
        synonims: dictionaryEntryEntity.tr_synonims.split(','),
        means: dictionaryEntryEntity.tr_means.split(','),
        example: {
          text: dictionaryEntryEntity.tr_example.split('/')[0],
          translated: dictionaryEntryEntity.tr_example.split('/')[1],
        },
      },
      dictionaryEntryEntity.rating,
      dictionaryEntryEntity.createAt,
      dictionaryEntryEntity.updateAt,
    );
    return dictionaryEntry;
  }
}
