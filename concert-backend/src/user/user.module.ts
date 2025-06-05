import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('JWT_SECRET');
        const expires = config.get<string>('JWT_EXPIRES_IN');
        console.log('DEBUG: JWT_SECRET =', secret);
        console.log('DEBUG: JWT_EXPIRES_IN =', expires);

        if (!secret) throw new Error('JWT_SECRET is undefined');
        return {
          secret,
          signOptions: { expiresIn: expires },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
