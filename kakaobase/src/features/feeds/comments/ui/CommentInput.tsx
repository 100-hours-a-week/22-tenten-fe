import useCommentForm from '../hooks/useCommentForm';
import { Send } from 'lucide-react';

export default function CommentInput() {
  const { comment, handleSubmit, handleChange } = useCommentForm();

  return (
    <form
      className="flex sticky w-full max-w-[480px] border-t-[1px] border-textOpacity50 bottom-0 mx-auto lg:self-start bg-bgColor text-textColor shadow-md items-center"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="rounded-3xl ml-6 my-4 px-4 py-2 bg-containerColor w-full">
        <div className="w-full flex justify-between gap-2">
          <textarea
            className="w-full focus:outline-none bg-transparent text-sm resize-none overflow-hidden"
            placeholder="댓글 내용을 작성하세요."
            rows={1}
            value={comment}
            onChange={handleChange}
            onInput={(e) => {
              const ta = e.currentTarget;
              ta.style.height = 'auto';
              ta.style.height = `${ta.scrollHeight}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
        </div>
      </div>
      <div
        className={`mr-4 ml-2 rounded-full p-2 flex justify-center items-center ${
          comment.trim() && 'hover:bg-containerColor'
        }`}
      >
        <Send
          size={24}
          viewBox="0 -2 26 24"
          className={`transition ${
            comment.trim()
              ? 'text-myBlue cursor-pointer'
              : 'text-innerContainerColor cursor-default'
          }`}
          onClick={comment.trim() ? handleSubmit : undefined}
        />
      </div>
    </form>
  );
}
