import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/LoginDto';
import { RegisterDto } from './dto/registerDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<any> {
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

  @Get('/logout')
  logout(): any {
    return this.userService.logout(); // could clear session/token
  }
}
