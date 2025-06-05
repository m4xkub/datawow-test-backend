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

  @Get('/getAll')
  getConcerts(): { concerts: ConcertDto[] } {
    // replace array with actual service that return array of ConcertDto
    return {
      concerts: [{ name: 'cold', description: 'play', seats: 2 }],
    };
  }

  @Get('/:id')
  getConcertById(@Param('id', ParseIntPipe) id: number): {
    concert: ConcertDto;
  } {
    // replace array with actual service that return ConcertDto
    console.log('id : ', id);
    return {
      concert: { name: 'cold', description: 'play', seats: 2 },
    };
  }

  @UseGuards(AuthGuard)
  @Post('/create')
  createConcert(@Body() obj: ConcertDto, @Req() req) {
    console.log('Received concert:', obj);
    if (req.user != Role.ADMIN) {
      console.log('Role :', req.user);
      throw new ForbiddenException('Admin only');
    }
    // TODO : add it to database
    return {
      message: 'Concert entry created',
      data: obj,
    };
  }

  @UseGuards(AuthGuard)
  @Patch('/update/:id')
  updateConcert(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedObj: UpdateConcertDto,
    @Req() req,
  ) {
    if (req.user != Role.ADMIN) {
      console.log('Role :', req.user);
      throw new ForbiddenException('Admin only');
    }
    return {
      message: 'Concert updated',
      data: updatedObj,
      id: id,
    };
  }

  @Delete('/delete/:id')
  deleteConcert(@Param('id', ParseIntPipe) id: string, @Req() req) {
    if (req.user != Role.ADMIN) {
      console.log('Role :', req.user);
      throw new ForbiddenException('Admin only');
    }
    return {
      message: 'Concert deleted',
      id: id,
    };
  }
}
