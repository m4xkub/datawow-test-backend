import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from 'src/config/role';
import { Column } from 'typeorm';

export class LoginDto {
  @ApiProperty({ example: 'sarunpat' })
  @IsString()
  username: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  password: string;
}
