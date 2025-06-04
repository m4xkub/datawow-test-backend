import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryAction, HistoryDto } from './dto/historyDto';

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
          action: HistoryAction.CANCELED,
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
