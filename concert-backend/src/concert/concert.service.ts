import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Concert } from './concert.entity';

@Injectable()
export class ConcertService {
  getConcerts() {
    return 'concert';
  }

  getConcertById() {}

  createConcert() {}

  updateConcert() {}

  deleteConcert() {}
}
