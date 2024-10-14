import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'dictionary_entry' })
export class DictionaryEntry {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  rating: number;

  @Column()
  word: string;

  @Column({ name: 'create_at' })
  createAt: string;

  @Column({ name: 'update_at' })
  updateAt: string;

  // @ManyToOne(() => Dictionary, (dictionary) => dictionary.dictionaryEntries)
  // dictionary: Dictionary;
}
