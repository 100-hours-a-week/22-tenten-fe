import { AlarmDetailEvent } from '../types/AlarmEvent';

export default function AlarmNameParticle({
  event,
}: {
  event: AlarmDetailEvent;
}) {
  if (event === 'comment.created') return '님이 댓글을 남겼습니다.';
  else if (event === 'recomment.created') return '님이 대댓글을 남겼습니다.';
  return '님이';
}
