import { Column, Entity, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm';

import { DictionaryEntity } from './dictionary';

@Entity({ name: 'dictionary-entry' })
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

  @Column({ name: 'create_at', type: 'timestamp' })
  createAt: Date;

  @Column({ name: 'update_at', type: 'timestamp' })
  updateAt: Date;
}
