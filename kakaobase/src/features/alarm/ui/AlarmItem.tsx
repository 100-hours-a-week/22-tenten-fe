'use client';

import FollowButtonSmall from '@/features/follows/ui/FollowButtonSmall';
import formatDate from '@/features/feeds/lib/formatDate';
import { CircleCheck, CircleX, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import AlarmContent from './AlarmContent';
import AlarmProfile from './AlarmProfile';
import AlarmAction from './AlarmAction';
import AlarmNameParticle from './AlarmNameParticle';
import useAlarmSwipe from '../hooks/useAlarmSwipe';
import useAlarmRouting from '../hooks/useAlarmRouting';
import { AlarmItem as AlarmItemType } from '../types/AlarmResponse';

export default function AlarmItem({ data }: { data: AlarmItemType }) {
  const alarm = data.data;
  const sender = data.data.sender;
  const event = data.event;

  const {
    isRead,
    showActions,
    isDeleted,
    offsetX,
    wasDragged,
    handleClose,
    handleDelete,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleRead,
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
  } = useAlarmSwipe({ data: alarm });

  const { goToPost, goToProfile } = useAlarmRouting({ data: alarm });

  if (data === null || alarm === null || sender === null) return null;
  if (isDeleted) return null;

  return (
    <div
      className={clsx(
        'relative transition-transform duration-200 cursor-pointer',
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
      <div
        className="flex px-6 py-4 justify-between gap-2 w-full items-center"
        onClick={(e) => {
          if (wasDragged.current) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }

          if (event === 'following.created') {
            goToProfile();
          } else {
            goToPost();
          }
        }}
      >
        <div className="flex gap-2 items-center min-w-0">
          <div
            className={`w-2 h-2 rounded-full ${!isRead && 'bg-myBlue'}`}
          ></div>
          <div className="relative w-10 h-10 rounded-xl shrink-0">
            <AlarmProfile sender={sender} />
          </div>
          <div>
            <div className="flex gap-1 items-center">
              <div className="font-bold">
                {sender.nickname === null ? '알수 없음' : sender.nickname}
              </div>
              <div className="text-xs overflow-hidden whitespace-pre-wrap break-all line-clamp-1 text-ellipsis">
                <AlarmNameParticle event={event} />
              </div>
            </div>
            <div className="flex items-center gap-2 w-full text-xs">
              <div className="text-xs overflow-hidden break-all whitespace-pre-wrap line-clamp-1 text-ellipsis">
                <AlarmContent data={data} />
              </div>
              <div className="shrink-0 text-textOpacity50">
                {formatDate(alarm.timestamp)}
              </div>
            </div>
          </div>
        </div>

        {event === 'following.created' && sender.is_followed && (
          <FollowButtonSmall isFollowing={sender.is_followed} id={sender.id} />
        )}

        {showActions && (
          <div className="flex gap-1">
            {!isRead && <AlarmAction icon={CircleCheck} fn={handleRead} />}
            <AlarmAction icon={Trash2} fn={handleDelete} />
            <AlarmAction icon={CircleX} fn={handleClose} />
          </div>
        )}
      </div>
    </div>
  );
}
