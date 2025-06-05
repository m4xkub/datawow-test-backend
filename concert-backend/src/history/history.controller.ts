import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryDto } from './dto/historyDto';
import { History } from './history.entity';
import { Role } from 'src/config/role';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}
  // we cannot patch history or delete history. If that happened , it would be hard to audit the system.

  @Get()
  @UseGuards(AuthGuard)
  async getHistories(
    @Req() req,
  ): Promise<{ message: string; result: History[] }> {
    if (req.user != Role.ADMIN) {
      console.log('Role :', req.user);
      throw new ForbiddenException('Admin only');
    }
    const res = await this.historyService.getHistories();
    return res;
  }

  @Post('/create')
  @UseGuards(AuthGuard)
  async createHistory(@Body() obj: HistoryDto, @Req() req) {
    if (!req.id) {
      throw new UnauthorizedException('User need to log-in');
    }

    console.log('Received history:', obj);
    // TODO : add it to database
    const res = await this.historyService.createHistory(obj);
    return res;
  }
}
