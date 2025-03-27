import { IDictionaryRepository } from '@application/repositories/dictionary.interface';
import { Dictionary } from '@domain/dictionary';
import { DictionaryEntity } from '@infrastructure/data/postgres/entities/dictionary';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DictionaryRepository implements IDictionaryRepository {
  constructor(
    @InjectRepository(DictionaryEntity)
    private dictionaryRepository: Repository<DictionaryEntity>,
  ) {}

  async save(dictionary: Dictionary): Promise<Dictionary> {
    const dictionaryEntity = this.toDictionaryEntity(dictionary);

    const savedDictionaryEntity = await this.dictionaryRepository.save({
      ...dictionaryEntity,
      user: { id: dictionary.userId },
    });

    return this.toDictionary(savedDictionaryEntity);
  }

  async findAll(userId: string): Promise<Dictionary[]> {
    const res = await this.dictionaryRepository.find({
      relations: ['user'],
      where: { user: { id: userId } },
    });
    return res.map((dictionary) => this.toDictionary(dictionary));
  }

  async findById(userId: string, id: string): Promise<Dictionary | null> {
    const res = await this.dictionaryRepository.findOne({
      relations: ['user'],
      where: { id, user: { id: userId } },
    });
    return res ? this.toDictionary(res) : null;
  }

  private toDictionaryEntity(dictionary: Dictionary): DictionaryEntity {
    const dictionaryEntity: DictionaryEntity = new DictionaryEntity();
    dictionaryEntity.id = dictionary.id;
    dictionaryEntity.name = dictionary.name;
    dictionaryEntity.createAt = dictionary.createAt;
    dictionaryEntity.updateAt = dictionary.updateAt;

    return dictionaryEntity;
  }

  private toDictionary(dictionaryEntity: DictionaryEntity): Dictionary {
    const dictionary: Dictionary = new Dictionary(
      dictionaryEntity.id,
      dictionaryEntity.user.id,
      dictionaryEntity.name,
      dictionaryEntity.createAt,
      dictionaryEntity.updateAt,
    );

    return dictionary;
  }
}
