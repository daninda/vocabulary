import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { DictionaryEntryEntity } from './dictionary-entry';
import { UserEntity } from './user';

@Entity({ name: 'dictionary' })
export class DictionaryEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.dictionaries, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'user_id' })
  user: UserEntity;

  @Column()
  name: string;

  @OneToMany(
    () => DictionaryEntryEntity,
    (dictionaryEntity) => dictionaryEntity.dictionary,
    {
      onDelete: 'CASCADE',
    },
  )
  dictionaryEntities: DictionaryEntryEntity[];

  @Column({ name: 'create_at', type: 'timestamp' })
  createAt: Date;

  @Column({ name: 'update_at', type: 'timestamp' })
  updateAt: Date;
}
