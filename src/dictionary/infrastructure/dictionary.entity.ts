import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'dictionary' })
export class DictionaryEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ name: 'create_at' })
  createAt: string;

  @Column({ name: 'update_at' })
  updateAt: string;
}
