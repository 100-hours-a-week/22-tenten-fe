import { AlarmEvent } from './AlarmEvent';
import { AlarmFetchData } from './AlarmFetchResponse';

export type AlarmResponse =
  | {
      type: string;
      event: 'notification.fetch';
      data: AlarmFetchData;
    }
  | {
      type: string;
      event: Exclude<AlarmEvent, 'notification.fetch'>;
      data: AlarmDefaultData;
    };

export interface AlarmDefaultData {
  id: number;
  message: string;
  timestamp: string;
}
