import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { ConcertModule } from './concert/concert.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [UserModule, ConcertModule, HistoryModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
