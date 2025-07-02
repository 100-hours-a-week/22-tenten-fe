export type AlarmDetailEvent =
  | 'comment.created'
  | 'recomment.created'
  | 'following.created'
  | 'post.like.created'
  | 'comment.like.created'
  | 'recomment.like.created';

export type AlarmEvent =
  | 'notification.fetch'
  | 'notification.remove'
  | 'notification.read.ack'
  | 'notification.read.nack'
  | 'notification.remove.ack'
  | 'notification.remove.nack';
