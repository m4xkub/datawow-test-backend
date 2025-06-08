import { IsString, IsInt, Min, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Action } from 'src/config/action';

export class HistoryDto {
  @ApiProperty({ example: 'Coldplay Live in Bangkok' })
  @IsString()
  concertName: string;

  @ApiProperty({ enum: Action, example: Action.RESERVED })
  @IsEnum(Action)
  action: Action;
}
