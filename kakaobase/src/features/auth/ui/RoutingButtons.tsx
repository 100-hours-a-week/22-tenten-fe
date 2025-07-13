'use client';
import SubmitButton from '@/shared/ui/button/SubmitButton';
import { useRouter } from 'next/navigation';

export default function RoutingButtons() {
  const router = useRouter();
  function goLogin() {
    router.push('/login');
  }
  function goHome() {
    router.push('/');
  }
  return (
    <div className="flex flex-col items-center md:flex-row gap-4">
      <SubmitButton text="로그인 하러 가기" onClick={goLogin} />
      <SubmitButton text="메인 페이지로 가기" onClick={goHome} />
    </div>
  );
}
