import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'dictionary' })
export class DictionaryEntity {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'create_at' })
  createAt: string;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: string;

  // @OneToMany(
  //   () => DictionaryEntry,
  //   (dictionaryEntry) => dictionaryEntry.dictionary,
  // )
  // dictionaryEntries: DictionaryEntry[];
}
