import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './history.entity';
import { HistoryDto } from './dto/historyDto';

@Injectable()
export class HistoryService {
  //   constructor(
  //     @InjectRepository(History)
  //     private historyRepo: Repository<History>,
  //   ) {}
  historyRepo;
  async getHistories() {
    const res = await this.historyRepo.find();
    if (!res) {
      throw new InternalServerErrorException('Please Try Again');
    }
    return {
      message: 'Retrieve Histories Successful',
      result: res,
    };
  }

  async createHistory(obj: HistoryDto) {
    const history = this.historyRepo.create(obj);
    const res = await this.historyRepo.save(history);

    if (!res) {
      throw new InternalServerErrorException('Please Try Again');
    }
    return {
      message: 'Create History Successful',
      result: res,
    };
  }
}
