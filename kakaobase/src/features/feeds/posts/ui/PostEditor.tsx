'use client';
import SubmitButton from '@/shared/ui/button/SubmitButton';
import { usePostEditorForm } from '../hooks/usePostEditorForm';
import ContentInput from './ContentInput';
import YoutubeInput from './YoutubeInput';
import ImageInput from './ImageInput';

export default function PostEditor() {
  const {
    isLoading,
    register,
    handleSubmit,
    formState: { errors, isValid },
    onSubmit,
    watch,
    setValue,
  } = usePostEditorForm();

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center w-full gap-10 py-10 text-textColor">
        <div className="flex flex-col gap-6 w-full px-12">
          <ContentInput errors={errors} register={register} />
          <YoutubeInput errors={errors} register={register} />
          <ImageInput errors={errors} watch={watch} setValue={setValue} />
        </div>
        <SubmitButton
          isLoading={isLoading}
          text="게시글 업로드"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        />
      </div>
    </div>
  );
}
