import { Column, Entity, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm';

import { UserEntity } from './user';

@Entity({ name: 'session' })
export class SessionEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.sessions, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'user_id' })
  user: UserEntity;

  @Column()
  fingerprint: string;

  @Column()
  refreshToken: string;

  @Column({ name: 'create_at', type: 'timestamp' })
  createAt: Date;

  @Column({ name: 'update_at', type: 'timestamp' })
  updateAt: Date;
}
