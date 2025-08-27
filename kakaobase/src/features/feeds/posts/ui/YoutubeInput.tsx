import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { NewPostData } from '../hooks/usePostEditorForm';
import HelperText from './HelperText';
import { Youtube } from 'lucide-react';

export default function YoutubeInput({
  errors,
  register,
}: {
  errors: FieldErrors<NewPostData>;
  register: UseFormRegister<NewPostData>;
}) {
  return (
    <div className="w-full">
      <div className="flex gap-2 font-bold">
        <Youtube />
        <div className="text-md font-bold">유튜브 링크</div>
      </div>
      <input
        {...register('youtubeUrl')}
        placeholder="유튜브 링크를 입력하세요."
        className="w-full focus:outline-none bg-transparent text-xs"
      />
      <HelperText errorMessage={errors.youtubeUrl?.message || ''} />
    </div>
  );
}
