import { CircleX } from 'lucide-react';
import { recommentFormStateStore } from '../stores/recommentFormStateStore';

export default function RecommentStateBar() {
  const { isWritingRecomment, commentWriter, stopRecomment } =
    recommentFormStateStore();

  if (!isWritingRecomment) return null;

  return (
    <div className="w-full bg-textColor opacity-40 text-containerColor flex justify-between items-center px-4 py-2 text-sm mb-[4.25rem]">
      <div>{commentWriter}에게 남기는 대댓글</div>
      <div
        onClick={stopRecomment}
        className="hover:bg-bgColor hover:opacity-80 hover:text-textColor rounded-full p-[0.125rem]"
      >
        <CircleX size={16} />
      </div>
    </div>
  );
}
