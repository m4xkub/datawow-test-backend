import { Action } from 'src/config/action';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  timestamp: Date;

  @Column()
  concertName: string;

  @Column({
    type: 'enum',
    enum: Action,
  })
  action: Action;
}
