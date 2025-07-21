import { UserBasic } from '@/entities/users/types/UserBasic';
import { AlarmDetailEvent } from './AlarmEvent';

export interface AlarmFetchData {
  unread_count: number;
  has_next: boolean;
  notifications: AlarmItem[];
}

export interface AlarmItem {
  event: AlarmDetailEvent;
  data: AlarmItemData;
}

export interface AlarmItemData {
  id: number;
  sender: UserBasic;
  target_id: number;
  content?: string;
  is_read: boolean;
  timestamp: string;
}
