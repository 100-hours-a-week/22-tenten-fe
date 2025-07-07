import { useRef, useState } from 'react';
import { sendNotificationCommand } from '../lib/socket';

export default function useAlarmSwipe({ data }: { data: any }) {
  const [isRead, setRead] = useState<boolean>(data.is_read);
  const [showActions, setShowActions] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const startX = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const wasDragged = useRef(false); // 추가

  //터치 이벤트
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
    if (Math.abs(deltaX) > 4) wasDragged.current = true;
    if (deltaX < -60) setShowActions(true);
    setOffsetX(deltaX);
  }

  function handleMouseUp() {
    setIsDragging(false);
    setOffsetX(0);
    startX.current = null;

    setTimeout(() => {
      wasDragged.current = false;
    }, 0);
  }

  function handleDelete(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    sendNotificationCommand('notification.remove', {
      id: data.id,
      timestamp: new Date().toISOString().split('.')[0],
    });
    setIsDeleted(true);
  }

  function handleClose(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    setShowActions(false);
  }

  function handleRead(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    sendNotificationCommand('notification.read', {
      id: data.id,
      timestamp: new Date().toISOString().split('.')[0],
    });
    setRead((prev) => !prev);
    setShowActions(false);
  }

  return {
    showActions,
    isRead,
    isDeleted,
    offsetX,
    wasDragged,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove,
    handleClose,
    handleDelete,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleRead,
  };
}
