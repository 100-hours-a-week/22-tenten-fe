import useRoutings from '@/shared/hooks/useRoutings';
import SubmitButton from '@/shared/ui/button/SubmitButton';

export default function RoutingButtons({ userId }: { userId: number }) {
  const { goPasswordEdit, goWithdraw } = useRoutings();

  return (
    <div className="flex gap-4 flex-col sm:flex-row">
      <SubmitButton
        type="button"
        text="비밀번호 변경하기"
        onClick={() => goPasswordEdit(userId)}
      />
      <SubmitButton text="회원 탈퇴하기" onClick={() => goWithdraw(userId)} />
    </div>
  );
}
