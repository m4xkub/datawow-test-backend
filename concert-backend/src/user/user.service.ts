import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/LoginDto';
import { RegisterDto } from './dto/registerDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async getUsers() {
    return { users: await this.userRepo.find() };
  }

  async login(obj: LoginDto) {
    const user = await this.userRepo.findOne({
      where: { username: obj.username },
    });

    // do this to prevent malecious user to do a brute-force attack (by knowing username or password is wrong)
    if (!user || !(await bcrypt.compare(obj.password, user.password))) {
      throw new BadRequestException('Username or password is incorrect');
    }

    const payload = { id: user.id, username: user.username, role: user.role };
    const token = this.jwtService.sign(payload);
    return { message: 'Login successful', token };
  }

  logout() {}

  async register(obj: RegisterDto) {
    const exist = await this.userRepo.findOne({
      where: { username: obj.username },
    });
    if (exist) throw new BadRequestException('Username is already existed');

    const hashed = await bcrypt.hash(obj.password, 10);
    const user = this.userRepo.create({ ...obj, password: hashed });
    await this.userRepo.save(user);

    const payload = { id: user.id, username: user.username, role: user.role };
    const token = this.jwtService.sign(payload);

    return { message: 'Register successful', token };
  }
}
