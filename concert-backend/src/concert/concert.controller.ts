import { Controller, Get } from '@nestjs/common';
import { ConcertService } from './concert.service';

interface Concert {
  id: number;
  name: string;
  description: string;
  seats: number;
}

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Get()
  getUsers(): { concerts: string } {
    return {
      concerts: this.concertService.getConcerts(),
    };
  }
}
