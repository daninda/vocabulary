import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { DictionaryEntity } from './dictionary';
import { TestStatisticEntity } from './test-statistic';

@Entity({ name: 'dictionary_entry' })
export class DictionaryEntryEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne(
    () => DictionaryEntity,
    (dictionary) => dictionary.dictionaryEntities,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinTable({ name: 'dictionary_id' })
  dictionary: DictionaryEntity;

  @OneToMany(
    () => TestStatisticEntity,
    (testStatistic) => testStatistic.dictionaryEntry,
    {
      onDelete: 'CASCADE',
    },
  )
  testStatistic: DictionaryEntryEntity[];

  @Column()
  word: string;

  @Column()
  pos: string;

  @Column({ type: 'int4', enum: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5] })
  rating: number;

  @Column()
  tr_word: string;

  @Column()
  tr_pos: string;

  @Column()
  tr_synonims: string;

  @Column()
  tr_means: string;

  @Column()
  tr_example: string;

  @Column({ name: 'create_at', type: 'timestamp with time zone' })
  createAt: Date;

  @Column({ name: 'update_at', type: 'timestamp with time zone' })
  updateAt: Date;
}
