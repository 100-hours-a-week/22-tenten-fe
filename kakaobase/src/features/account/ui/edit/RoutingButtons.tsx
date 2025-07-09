import SubmitButton from '@/shared/ui/button/SubmitButton';
import { useRouter } from 'next/navigation';

export default function RoutingButtons() {
  const router = useRouter();
  function navPasswordEdit() {
    router.push('edit/password');
  }
  function navWithdraw() {
    router.push('edit/withdraw');
  }
  return (
    <div className="flex gap-2 flex-col sm:flex-row">
      <SubmitButton text="비밀번호 변경하기" onClick={navPasswordEdit} />
      <SubmitButton text="회원 탈퇴하기" onClick={navWithdraw} />
    </div>
  );
}
