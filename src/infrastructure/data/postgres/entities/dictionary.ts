import { Column, Entity, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm';

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

  @Column({ name: 'create_at' })
  createAt: string;

  @Column({ name: 'update_at' })
  updateAt: string;
}
