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
