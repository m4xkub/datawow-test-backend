import { IsString, IsInt, Min, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Action } from 'src/config/action';

export class HistoryDto {
  @ApiProperty({ example: '2025-06-04T14:30:00Z' })
  @IsString()
  timestamp: string;

  @ApiProperty({ example: 'sarunpat' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'Coldplay Live in Bangkok' })
  @IsString()
  concertName: string;

  @ApiProperty({ enum: Action, example: Action.RESERVED })
  @IsEnum(Action)
  action: Action;
}
