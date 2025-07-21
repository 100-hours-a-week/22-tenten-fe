export interface Chat {
  chat_id: number;
  sender_id: number;
  content: string;
  timestamp: string;
  is_read: boolean;
}
