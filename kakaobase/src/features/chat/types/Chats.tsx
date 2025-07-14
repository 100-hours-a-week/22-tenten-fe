export interface Chat {
  chat_id: number;
  sender_id: number;
  content: string;
  timestimap: string;
  is_read: boolean;
}

export interface ChatList {
  data: Chat[];
}

export interface AckResponse {
  id: number;
  message: string;
  timestamp: string;
}

export interface NackResponse {
  id: number;
  error: string;
  message: string;
  timestamp: string;
}
