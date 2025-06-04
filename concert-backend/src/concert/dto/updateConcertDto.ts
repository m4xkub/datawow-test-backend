// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { ConcertDto } from './concertDto';

export class UpdateConcertDto extends PartialType(ConcertDto) {}
