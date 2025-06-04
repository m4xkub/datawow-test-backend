import { Injectable } from '@nestjs/common';

@Injectable()
export class HistoryService {
  getHistory() {
    return 'history';
  }
}
