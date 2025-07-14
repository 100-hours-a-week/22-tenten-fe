export type ChatClientEvent =
  | 'chat.send'
  | 'chat.typing'
  | 'chat.stop'
  | 'chat.stream.end.ack'
  | 'chat.stream.end.nack';

export type ChatServerEvent =
  | 'chat.loading'
  | 'chat.stream.start'
  | 'chat.stream'
  | 'chat.stream.end'
  | 'chat.error'
  | 'chat.stream.error';
