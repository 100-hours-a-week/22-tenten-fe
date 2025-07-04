import { useRef, useState } from 'react';

export default function useAlarmSwipe({ is_read }: { is_read: boolean }) {
  const [isRead, setRead] = useState(is_read);

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

  function handleClose() {
    setShowActions(false);
  }

  function handleRead() {
    setRead((prev) => !prev);
    setShowActions(false);
  }
  return {
    showActions,
    isRead,
    isDeleted,
    offsetX,
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
