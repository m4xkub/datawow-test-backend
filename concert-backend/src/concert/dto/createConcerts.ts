import { IsString, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConcertDto {
  @ApiProperty({ example: 'Coldplay Live in Bangkok' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'A world tour concert in Thailand' })
  @IsString()
  description: string;

  @ApiProperty({ example: 3000 })
  @IsInt()
  @Min(1)
  seats: number;
}
