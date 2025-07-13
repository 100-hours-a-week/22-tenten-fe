'use client';
import SubmitButtonSmall from '@/shared/ui/button/SubmitButtonSmall';
import UserInput from '@/entities/users/ui/UserInput';
import RoutingButtons from './RoutingButtons';
import TopArea from './TopArea';
import useGithubEditHook from '../../hooks/useGithubEditHook';

export default function EditWrapper({ userId }: { userId: number }) {
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
        <RoutingButtons userId={userId} />
      </div>
    </div>
  );
}
