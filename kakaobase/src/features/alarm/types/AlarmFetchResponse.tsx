import { AlarmDetailEvent } from './AlarmEvent';

export interface AlarmFetchData {
  unread_count: number;
  notifications: AlarmItem[];
}

export interface AlarmItem {
  type: string;
  event: AlarmDetailEvent;
  data: AlarmItemData;
}

export interface AlarmItemData {
  id: number;
  sender: Sender;
  target_id: number;
  content?: string;
  is_read: boolean;
  timestamp: string;
}

export interface Sender {
  id: number;
  name?: string;
  nickname: string;
  image_url: string | null;
  is_followed?: boolean;
}
