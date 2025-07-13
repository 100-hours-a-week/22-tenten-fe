export type ChatServerEvent =
  | 'chat.loading'
  | 'chat.stream.start'
  | 'chat.stream'
  | 'chat.stream.end'
  | 'chat.error'
  | 'chat.stream.error';
