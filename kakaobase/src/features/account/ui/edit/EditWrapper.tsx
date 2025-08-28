'use client';
import SubmitButtonSmall from '@/shared/ui/button/SubmitButtonSmall';
import useGithubEditHook from '../../hooks/useGithubEditHook';
import UserInput from '@/entities/users/ui/UserInput';
import dynamic from 'next/dynamic';

const TopArea = dynamic(() => import('./TopArea'), { ssr: false });
const RoutingButton = dynamic(
  () => import('@/shared/ui/button/RoutingButton'),
  { ssr: false }
);

export default function EditWrapper() {
  const {
    githubUrl,
    onSubmit,
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useGithubEditHook();

  return (
    <div className="flex w-full px-6 justify-center items-center">
      <div className="flex w-full bg-containerColor px-8 py-8 animate-slide-in rounded-xl flex flex-col items-center gap-6 max-w-sm">
        <TopArea />
        <div className="flex items-center gap-4 w-full">
          <UserInput
            label="깃허브 링크"
            placeholder={githubUrl}
            {...register('githubUrl')}
            errorMessage={errors.githubUrl?.message || ''}
          />
          <SubmitButtonSmall
            label="저장"
            disabled={!isValid}
            onClick={handleSubmit(onSubmit)}
          />
        </div>
        <div className="flex gap-4 flex-col sm:flex-row">
          <RoutingButton
            text="비밀번호 변경하기"
            path="/profile/edit/password"
          />
          <RoutingButton text="회원 탈퇴하기" path="/profile/edit/withdraw" />
        </div>
      </div>
    </div>
  );
}
