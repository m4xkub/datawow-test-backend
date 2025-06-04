import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/LoginDto';
import { RegisterDto } from './dto/registerDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async getUsers() {
    return { users: await this.userRepo.find() };
  }

  async login(obj: LoginDto) {
    const user = await this.userRepo.findOne({
      where: { username: obj.username },
    });

    // do this to prevent malecious user to do a brute-force attack (by knowing username or password is wrong)
    if (!user || user.password !== obj.password) {
      throw new BadRequestException('Username or password is incorrect');
    }
    return { message: 'Login successful' };
  }

  logout() {}

  async register(obj: RegisterDto) {
    const exist = await this.userRepo.findOne({
      where: { username: obj.username },
    });
    if (exist) throw new BadRequestException('Username is already existed');

    const user = this.userRepo.create(obj);

    const saved = await this.userRepo.save(user);

    return { message: 'Register successful' };
  }
}
