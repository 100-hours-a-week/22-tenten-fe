export type ChatPublishingEvent =
  | 'chat.send'
  | 'chat.typing'
  | 'chat.stop'
  | 'chat.stream.end.ack'
  | 'chat.stream.end.nack';
