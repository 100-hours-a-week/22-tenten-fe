import { AlarmDetailEvent } from '../types/AlarmEvent';
import { AlarmItem } from '../types/AlarmResponse';

export default function AlarmContent({ data }: { data: AlarmItem }) {
  const event = data.event as AlarmDetailEvent;
  if (event === 'comment.created' || event === 'recomment.created')
    return data.data.content;
  else if (event === 'comment.like.created')
    return '회원님의 댓글을 좋아합니다.';
  else if (event === 'post.like.created')
    return '회원님의 게시글을 좋아합니다.';
  else if (event === 'recomment.like.created')
    return '회원님의 대댓글을 좋아합니다.';
  return '회원님을 팔로우하기 시작했습니다.';
}
