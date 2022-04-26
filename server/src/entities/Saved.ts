import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('saved', { schema: 'smail_db' })
export class Saved {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;
}
