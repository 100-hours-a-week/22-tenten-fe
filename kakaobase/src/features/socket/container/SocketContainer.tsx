'use client';
import useSocket from '@/features/socket/hooks/useSocket';

export default function SocketContainer() {
  useSocket();
  return null;
}
