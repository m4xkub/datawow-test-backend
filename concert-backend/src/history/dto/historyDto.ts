import { IsString, IsInt, Min, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum HistoryAction {
  RESERVED = 'Reserved',
  CANCELED = 'Canceled',
}

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

  @ApiProperty({ enum: HistoryAction, example: HistoryAction.RESERVED })
  @IsEnum(HistoryAction)
  action: HistoryAction;
}
