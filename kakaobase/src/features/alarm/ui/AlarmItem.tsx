'use client';

import FollowButtonSmall from '@/features/follows/ui/FollowButtonSmall';
import Image from 'next/image';
import { AlarmDetailEvent } from '../types/AlarmEvent';
import formatDate from '@/features/feeds/lib/formatDate';
import { CircleCheck, CircleX } from 'lucide-react';
import { useRef, useState } from 'react';
import clsx from 'clsx';

export default function AlarmItem({ data }: { data: any }) {
  const alarm = 'following.created' as AlarmDetailEvent;
  const userName = 'hazel.kim';
  const content = '너무 귀엽다..! 진짜ㅜㅜ';
  const [isRead, setRead] = useState(false);

  const [showActions, setShowActions] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const startX = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX;
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (startX.current === null) return;
    const deltaX = startX.current - e.touches[0].clientX;
    if (deltaX > 60) {
      setShowActions(true);
    }
    setOffsetX(-deltaX);
  }

  function handleTouchEnd() {
    setOffsetX(0);
    startX.current = null;
  }

  // 마우스 이벤트
  function handleMouseDown(e: React.MouseEvent) {
    startX.current = e.clientX;
    setIsDragging(true);
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!isDragging || startX.current === null) return;
    const deltaX = e.clientX - startX.current;
    if (deltaX < -60) setShowActions(true);
    setOffsetX(deltaX);
  }

  function handleMouseUp() {
    setIsDragging(false);
    setOffsetX(0);
    startX.current = null;
  }

  function handleDelete() {
    setIsDeleted(true);
    // 실제 삭제 요청 API 호출
  }

  function handleRead() {
    setRead((prev) => !prev);
    setShowActions(false);
  }

  if (isDeleted) return null;

  return (
    <div
      className={clsx(
        'relative transition-transform duration-200',
        isRead ? 'bg-transparent' : 'bg-containerColor',
        showActions && 'translate-x-[-60px]'
      )}
      style={{ transform: `translateX(${offsetX}px)` }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="flex px-6 py-4 justify-between gap-2 w-full items-center">
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
            <div className="flex items-center gap-4 w-full text-xs">
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

        {showActions && (
          <div className="flex gap-1">
            {!isRead && (
              <div
                className="flex w-6 h-6 bg-innerContainerColor hover:bg-myBlue hover:text-textOnBlue rounded-full items-center justify-center cursor-pointer"
                onClick={handleRead}
              >
                <CircleCheck size={14} />
              </div>
            )}
            <div
              className="flex w-6 h-6 bg-innerContainerColor hover:bg-myBlue hover:text-textOnBlue rounded-full items-center justify-center cursor-pointer"
              onClick={handleDelete}
            >
              <CircleX size={14} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
