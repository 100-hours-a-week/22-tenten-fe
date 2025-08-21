'use client';
import useRoutings from '@/shared/hooks/useRoutings';
import SubmitButton from '@/shared/ui/button/SubmitButton';
import Image from 'next/image';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const { goMain } = useRoutings();
  return (
    <div className="flex w-full h-screen flex-col items-center justify-center gap-6">
      <div className="w-40 h-40 relative flex">
        <Image
          src="/sad_logo.png"
          alt="not-found"
          fill
          className="object-contain"
          sizes="(max-width:480px) 160px, 40vw"
        />
      </div>
      <div className="text-lg font-bold text-center flex flex-col">
        <div>문제가 발생하였습니다.</div>
        <div>이용에 불편을 끼쳐드려 죄송합니다. 😭</div>
      </div>
      <div className="flex flex-col items-center md:flex-row gap-4">
        <SubmitButton text="메인 페이지로 가기" onClick={goMain} />
        <SubmitButton text="다시 시도하기" onClick={reset} />
      </div>
    </div>
  );
}
