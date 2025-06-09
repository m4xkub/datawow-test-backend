import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Concert } from '../entities/concert.entity';
import { History } from '../entities/history.entity';
import { ConcertDto } from './dto/concertDto';
import { Reserve } from 'src/entities/reserve.entity';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private concertRepo: Repository<Concert>,

    @InjectRepository(Reserve)
    private reserveRepo: Repository<Reserve>,
  ) {}
  async getConcerts(): Promise<{ message: string; result: Concert[] }> {
    const res = await this.concertRepo.find();
    return {
      message: 'Concert found',
      result: res,
    };
  }

  async getConcertById(
    id: string,
  ): Promise<{ message: string; result: Concert }> {
    const concert = await this.concertRepo.findOne({ where: { id } });
    if (!concert) throw new NotFoundException('Concert not found');
    return {
      message: 'Concert found',
      result: concert,
    };
  }

  async createConcert(
    obj: ConcertDto,
  ): Promise<{ message: string; result: Concert }> {
    const exist = await this.concertRepo.findOne({
      where: { name: obj.name },
    });

    if (exist) {
      throw new BadRequestException('Concert with this name already exists');
    }
    const concert = await this.concertRepo.create(obj);
    const res = await this.concertRepo.save(concert);

    return {
      message: 'Concert entry created',
      result: res,
    };
  }

  async updateConcert(
    id: string,
    obj: Partial<ConcertDto>,
  ): Promise<{ message: string }> {
    const res = await this.concertRepo.update(id, obj);
    return { message: 'Successfully updated concert' };
  }

  async deleteConcert(id: string): Promise<{ message: string }> {
    const res = await this.concertRepo.delete(id);
    console.log(id);
    if (res.affected === 0) throw new NotFoundException('Concert not found');
    return { message: 'Concert deleted successfully' };
  }

  async reserveSeat(obj: { userId: string; concertId: string }) {
    const exist = await this.reserveRepo.findOne({
      where: { userId: obj.userId, concertId: obj.concertId },
    });

    if (exist) {
      throw new BadRequestException('User already reserved this concert.');
    }

    const reservedCount = await this.reserveRepo.count({
      where: { concertId: obj.concertId },
    });

    const targetConcert = await this.concertRepo.findOne({
      where: { id: obj.concertId },
    });

    if (reservedCount === targetConcert.seats) {
      throw new BadRequestException('No available seats for this concert.');
    }

    const reserve = this.reserveRepo.create(obj);
    const res = await this.reserveRepo.save(reserve);

    return {
      message: 'reserve seat success',
      result: res,
    };
  }

  async cancelSeat(obj: { userId: string; concertId: string }) {
    const res = await this.reserveRepo.delete(obj);
    if (res.affected === 0) throw new NotFoundException('Reserve not found');
    return { message: 'Reserve deleted successfully', result: res };
  }

  async getTotalSeats() {
    const total = await this.concertRepo
      .createQueryBuilder('concert')
      .select('SUM(concert.seats)', 'sum')
      .getRawOne();

    return { result: parseInt(total.sum, 10) || 0 };
  }

  async isReserved(obj: { userId: string; concertId: string }) {
    const exist = await this.reserveRepo.findOne({
      where: { userId: obj.userId, concertId: obj.concertId },
    });

    if (exist) {
      return { result: true };
    }
    return { result: false };
  }
}
