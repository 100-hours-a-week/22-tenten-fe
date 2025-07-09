'use client';
import SubmitButtonSmall from '@/shared/ui/button/SubmitButtonSmall';
import UserInput from '@/entities/users/ui/UserInput';
import RoutingButtons from './RoutingButtons';
import TopArea from './TopArea';
import useGithubEditHook from '../../hooks/useGithubEditHook';

export default function EditWrapper() {
  const {
    githubUrl,
    onSubmit,
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useGithubEditHook();

  return (
    <div className="flex items-center justify-center mx-6 mb-16 h-screen scroll-none">
      <div className="flex w-full px-8 pb-8 pt-6 bg-containerColor rounded-xl flex flex-col items-center gap-4 max-w-sm">
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
        <RoutingButtons />
      </div>
    </div>
  );
}
