import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertDto } from './dto/concertDto';
import { UpdateConcertDto } from './dto/updateConcertDto';
import { Role } from 'src/config/role';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Get()
  async getConcerts() {
    return await this.concertService.getConcerts();
  }

  @UseGuards(AuthGuard)
  @Get('/totalseats')
  async getTotalSeats(@Req() req) {
    if (req.user != Role.ADMIN) {
      console.log('Role :', req.user);
      throw new ForbiddenException('Admin only');
    }

    const res = await this.concertService.getTotalSeats();
    return res;
  }

  @Get('/:id')
  async getConcertById(@Param('id', ParseIntPipe) id: string) {
    const res = await this.concertService.getConcertById(id);
    return res;
  }

  @UseGuards(AuthGuard)
  @Post('/create')
  async createConcert(@Body() obj: ConcertDto, @Req() req) {
    console.log('Received concert:', obj);
    if (req.user != Role.ADMIN) {
      console.log('Role :', req.user);
      throw new ForbiddenException('Admin only');
    }
    const res = await this.concertService.createConcert(obj);
    return res;
  }
  @UseGuards(AuthGuard)
  @Patch('/update/:id')
  async updateConcert(
    @Param('id', ParseIntPipe) id: string,
    @Body() updatedObj: UpdateConcertDto,
    @Req() req,
  ) {
    if (req.user != Role.ADMIN) {
      console.log('Role :', req.user);
      throw new ForbiddenException('Admin only');
    }
    const res = await this.concertService.updateConcert(id, updatedObj);
    return res;
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  async deleteConcert(@Param('id') id: string, @Req() req) {
    if (req.user != Role.ADMIN) {
      console.log('Role :', req.user);
      throw new ForbiddenException('Admin only');
    }
    const res = await this.concertService.deleteConcert(id);
    return res;
  }

  @UseGuards(AuthGuard)
  @Post('/reserve')
  async reserveSeat(@Body() obj: { concertId }, @Req() req) {
    const res = await this.concertService.reserveSeat({
      userId: req.id,
      concertId: obj.concertId,
    });
    return res;
  }

  @UseGuards(AuthGuard)
  @Post('/cancel')
  async cancelSeat(@Body() obj: { concertId }, @Req() req) {
    const res = await this.concertService.cancelSeat({
      userId: req.id,
      concertId: obj.concertId,
    });
    return res;
  }

  @UseGuards(AuthGuard)
  @Post('/isReserved')
  async isReserved(@Body() obj: { concertId }, @Req() req) {
    const res = await this.concertService.isReserved({
      userId: req.id,
      concertId: obj.concertId,
    });
    return res;
  }
}
