import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Concert } from './concert.entity';
import { ConcertDto } from './dto/concertDto';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private concertRepo: Repository<Concert>,
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
    const concert = this.concertRepo.create(obj);
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
    if (res.affected === 0) throw new NotFoundException('Concert not found');
    return { message: 'Concert deleted successfully' };
  }
}
