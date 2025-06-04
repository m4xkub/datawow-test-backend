import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertDto } from './dto/concertDto';
import { UpdateConcertDto } from './dto/updateConcertDto';

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

  @Post('/create')
  createConcert(@Body() obj: ConcertDto) {
    console.log('Received concert:', obj);
    // TODO : add it to database
    return {
      message: 'Concert entry created',
      data: obj,
    };
  }

  @Patch('/update/:id')
  updateConcert(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedObj: UpdateConcertDto,
  ) {
    return {
      message: 'Concert updated',
      data: updatedObj,
      id: id,
    };
  }

  @Delete('/delete/:id')
  deleteConcert(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'Concert deleted',
      id: id,
    };
  }
}
