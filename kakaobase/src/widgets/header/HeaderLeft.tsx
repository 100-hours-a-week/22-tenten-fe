'use client';
import useRoutings from '@/shared/hooks/useRoutings';
import { Undo2 } from 'lucide-react';

export default function HeaderLeft() {
  const { goBack } = useRoutings();

  return <Undo2 onClick={goBack} className="cursor-pointer self-center" />;
}
