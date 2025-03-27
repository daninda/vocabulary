import { Column, Entity, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm';

import { DictionaryEntryEntity } from './dictionary-entry';

@Entity({ name: 'test_statistic' })
export class TestStatisticEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne(
    () => DictionaryEntryEntity,
    (dictionaryEntry) => dictionaryEntry.testStatistic,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinTable({ name: 'dictionary_entry_id' })
  dictionaryEntry: DictionaryEntryEntity;

  @Column()
  isRight: boolean;

  @Column({ name: 'create_at', type: 'timestamp with time zone' })
  createAt: Date;
}
