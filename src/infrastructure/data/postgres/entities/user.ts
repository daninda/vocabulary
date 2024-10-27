import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { DictionaryEntity } from './dictionary';
import { SessionEntity } from './session';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @OneToMany(() => SessionEntity, (session) => session.user, {
    onDelete: 'CASCADE',
  })
  sessions: SessionEntity[];

  @OneToMany(() => DictionaryEntity, (dictionary) => dictionary.user, {
    onDelete: 'CASCADE',
  })
  dictionaries: DictionaryEntity[];

  @Column({ name: 'create_at' })
  createAt: string;

  @Column({ name: 'update_at' })
  updateAt: string;
}
