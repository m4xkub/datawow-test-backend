import { Module } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertController } from './concert.controller';
import { Concert } from './concert.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Concert]),
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
  providers: [ConcertService],
  controllers: [ConcertController],
})
export class ConcertModule {}
