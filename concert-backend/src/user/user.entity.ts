import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { History } from '../history/history.entity';
import { Role } from 'src/config/role';
import { UUID } from 'crypto';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
