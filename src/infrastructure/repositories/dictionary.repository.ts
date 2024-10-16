import { Injectable } from '@nestjs/common';
import { Dictionary } from 'src/domain/entities/dictionary';
import { IDictionaryRepository } from 'src/domain/repositories/dictionary.repository.interface';
import { DictionaryEntity } from '../data/postgres/entities/dictionary.entity';
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
    const res = await this.dictionaryRepository.save(dictionaryEntity);

    return this.toDictionary(res);
  }

  async findAll(): Promise<Dictionary[]> {
    const res = await this.dictionaryRepository.find();
    return res.map((dictionary) => this.toDictionary(dictionary));
  }

  async findById(id: string): Promise<Dictionary | null> {
    const res = await this.dictionaryRepository.findOneBy({ id });
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
      dictionaryEntity.name,
      dictionaryEntity.createAt,
      dictionaryEntity.updateAt,
    );

    return dictionary;
  }
}
