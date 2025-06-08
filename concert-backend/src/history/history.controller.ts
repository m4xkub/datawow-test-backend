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
import { History } from '../entities/history.entity';
import { Role } from 'src/config/role';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}
  // we cannot patch history or delete history. If that happened , it would be hard to audit the system.

  @Get()
  @UseGuards(AuthGuard)
  async getHistories(@Req() req) {
    if (req.user == Role.ADMIN) {
      const res = await this.historyService.getHistories();
      console.log(res);
      return res;
    } else if (req.user == Role.USER) {
      const res = await this.historyService.getHistoriesForUser(req.username);
      return res;
    } else {
      console.log('Role :', req.user);
      throw new ForbiddenException('Admin only');
    }
  }

  @Post('/create')
  @UseGuards(AuthGuard)
  async createHistory(@Body() obj: HistoryDto, @Req() req) {
    if (!req.id) {
      throw new UnauthorizedException('User need to log-in');
    }

    console.log('Received history:', obj);
    const res = await this.historyService.createHistory(obj, req.username);
    return res;
  }

  @Get('/reserve')
  @UseGuards(AuthGuard)
  async getNumReserve(@Req() req): Promise<{ result: number }> {
    if (req.user != Role.ADMIN) {
      console.log('Role :', req.user);
      throw new ForbiddenException('Admin only');
    }
    const res = await this.historyService.getNumReserve();
    return res;
  }

  @Get('/cancel')
  @UseGuards(AuthGuard)
  async getNumCancel(@Req() req): Promise<{ result: number }> {
    if (req.user != Role.ADMIN) {
      console.log('Role :', req.user);
      throw new ForbiddenException('Admin only');
    }
    const res = await this.historyService.getNumCancel();
    return res;
  }
}
