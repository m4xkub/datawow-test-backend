import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { History } from '../history/history.entity';
import { Role } from 'src/config/role';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
  })
  role: Role;
}
