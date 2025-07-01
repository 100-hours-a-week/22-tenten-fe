'use client';

import FollowButtonSmall from '@/features/follows/ui/FollowButtonSmall';
import Image from 'next/image';
import { AlarmDetailEvent } from '../types/AlarmEvent';
import formatDate from '@/features/feeds/lib/formatDate';

export default function AlarmItem({ data }: { data: any }) {
  const alarm = 'following.created' as AlarmDetailEvent;
  const userName = 'hazel.kim';
  const content = '너무 귀엽다..! 진짜ㅜㅜ';
  const isRead = false;

  return (
    <div
      className={`text-sm flex w-full ${
        isRead ? 'bg-transparent' : 'bg-innerContainerColor'
      }`}
    >
      <div className="flex px-6 py-4 justify-between gap-4 w-full items-center">
        <div className="flex gap-2 items-center min-w-0">
          <div className="relative w-10 h-10 rounded-xl shrink-0">
            <Image
              src="/logo_square.svg"
              alt="프로필"
              fill
              className="object-fit flex"
            />
          </div>
          <div>
            <div className="flex gap-1">
              <div className="font-bold">{userName}</div>
              {alarm === 'comment.created' || alarm === 'recomment.created' ? (
                <div>
                  님이 {alarm === 'comment.created' ? '댓글' : '대댓글'}을
                  남겼습니다.
                </div>
              ) : (
                <div>님이</div>
              )}
            </div>
            <div className="flex items-center gap-2 w-full text-xs">
              <div className="'w-full text-xs overflow-hidden break-all whitespace-pre-wrap line-clamp-1 text-ellipsis'">
                {alarm === 'comment.like.created' ||
                alarm === 'recomment.like.created' ||
                alarm === 'post.like.created'
                  ? content
                  : alarm === 'following.created'
                  ? '회원님을 팔로우하기 시작했습니다.'
                  : '회원님의 게시글을 좋아합니다.'}
              </div>
              <div className="shrink-0 text-textOpacity50">
                {formatDate('2025.06.30', false)}
              </div>
            </div>
          </div>
        </div>
        {alarm === 'following.created' && (
          <FollowButtonSmall isFollowing={false} id={1} />
        )}
      </div>
    </div>
  );
}
