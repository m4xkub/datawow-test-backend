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
    // replace array with actual service that return array of ConcertDto
    return await this.concertService.getConcerts();
  }

  @Get('/:id')
  async getConcertById(@Param('id', ParseIntPipe) id: string) {
    // replace array with actual service that return ConcertDto
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
    // TODO : add it to database
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
  async reserveSeat() {
    return;
  }
}
