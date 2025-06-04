import { Controller, Get } from '@nestjs/common';
import { ConcertService } from './concert.service';

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Get()
  getConcert(): { concerts: string } {
    return {
      concerts: this.concertService.getConcerts(),
    };
  }
}
