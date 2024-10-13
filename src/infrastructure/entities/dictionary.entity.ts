import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { DictionaryEntry } from './dictionary-entry.entity';

@Entity({ name: 'dictionary' })
export class Dictionary {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'create_at' })
  createAt: string;

  @Column({ name: 'update_at' })
  updateAt: string;

  @OneToMany(
    () => DictionaryEntry,
    (dictionaryEntry) => dictionaryEntry.dictionary,
  )
  dictionaryEntries: DictionaryEntry[];
}
