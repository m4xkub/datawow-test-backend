import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/LoginDto';
import { RegisterDto } from './dto/registerDto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from 'src/config/role';
import { AuthGuard } from 'src/guard/auth.guard';
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getUsers(@Req() req): Promise<any> {
    const user = req.user;
    if (user != Role.ADMIN) {
      console.log('Role :', user);
      throw new ForbiddenException('Admin only');
    }

    const res = await this.userService.getUsers();
    console.log('--------get-user--------');
    console.log(res);
    console.log('--------get-user--------');
    return res;
  }

  @Post('/register')
  async register(@Body() obj: RegisterDto): Promise<any> {
    const res = await this.userService.register(obj);
    console.log('--------register--------');
    console.log(res);
    console.log('--------register--------');
    return res;
  }

  @Post('/login')
  async login(@Body() obj: LoginDto): Promise<any> {
    const res = await this.userService.login(obj);
    console.log('--------login--------');
    console.log(res);
    console.log('--------login--------');
    return res;
  }
}
