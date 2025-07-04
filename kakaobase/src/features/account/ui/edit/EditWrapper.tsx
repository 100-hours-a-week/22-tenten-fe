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
    <div className="flex justify-center items-center animate-slide-in flex-col h-screen">
      <div className="flex bg-containerColor px-8 py-10 rounded-xl flex flex-col items-center gap-8 max-w-sm">
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
