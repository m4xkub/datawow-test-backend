import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Concert } from './concert.entity';

@Entity()
export class Reserve {
  @PrimaryColumn('uuid')
  userId: string;

  @PrimaryColumn('uuid')
  concertId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Concert, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'concertId' })
  concert: Concert;
}
