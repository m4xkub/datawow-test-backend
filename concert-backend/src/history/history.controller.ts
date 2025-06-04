import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryDto } from './dto/historyDto';
import { Action } from 'src/config/action';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}
  // we cannot patch history or delete history. If that happened , it would be hard to audit the system.
  @Get()
  getHistories(): { history: HistoryDto[] } {
    return {
      history: [
        {
          timestamp: 'test',
          username: 'test',
          concertName: 'clo',
          action: Action.CANCELED,
        },
      ],
    };
  }

  @Post('/create')
  createHistory(@Body() obj: HistoryDto) {
    console.log('Received history:', obj);
    // TODO : add it to database
    return {
      message: 'History entry created',
      data: obj,
    };
  }
}
