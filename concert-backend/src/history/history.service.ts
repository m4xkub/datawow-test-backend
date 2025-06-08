import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from '../entities/history.entity';
import { HistoryDto } from './dto/historyDto';
import { Action } from 'src/config/action';
import { format, toZonedTime } from 'date-fns-tz';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private historyRepo: Repository<History>,
  ) {}

  private formatTimestampToBangkok(timestamp: Date): string {
    const zoned = toZonedTime(timestamp, 'Asia/Bangkok');
    return format(zoned, 'yyyy-MM-dd HH:mm:ss');
  }
  async getHistories() {
    const res = await this.historyRepo.find();
    if (!res) {
      throw new InternalServerErrorException('Please Try Again');
    }

    const mapped = res.map((item) => ({
      ...item,
      timestamp: this.formatTimestampToBangkok(item.timestamp),
    }));
    return {
      message: 'Retrieve Histories Successful',
      result: mapped,
    };
  }

  async getHistoriesForUser(username: string) {
    const res = await this.historyRepo.find({ where: { username } });
    if (!res) {
      throw new InternalServerErrorException('Please Try Again');
    }
    const mapped = res.map((item) => ({
      ...item,
      timestamp: this.formatTimestampToBangkok(item.timestamp),
    }));
    return {
      message: 'Retrieve Histories Successful',
      result: mapped,
    };
  }

  async createHistory(obj: HistoryDto, username: string) {
    const history = this.historyRepo.create({
      concertName: obj.concertName,
      action: obj.action,
      timestamp: new Date(),
      username: username,
    });
    const res = await this.historyRepo.save(history);

    if (!res) {
      throw new InternalServerErrorException('Please Try Again');
    }
    return {
      message: 'Create History Successful',
      result: res,
    };
  }

  async getNumReserve() {
    const num = await this.historyRepo.count({
      where: { action: Action.RESERVED },
    });
    return { result: num };
  }

  async getNumCancel() {
    const num = await this.historyRepo.count({
      where: { action: Action.CANCELED },
    });
    return { result: num };
  }
}
