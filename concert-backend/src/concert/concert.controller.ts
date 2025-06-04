import { Controller, Get } from '@nestjs/common';
import { ConcertService } from './concert.service';

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Get()
  getHistory(): { concerts: string } {
    return {
      concerts: this.concertService.getConcerts(),
    };
  }
}
