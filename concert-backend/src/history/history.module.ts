import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from '../entities/history.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forFeature([History]),
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
  providers: [HistoryService],
  controllers: [HistoryController],
})
export class HistoryModule {}
