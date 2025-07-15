'use client';
import useMessageForm from '../hooks/useMessageForm';
import { CircleStop, Send } from 'lucide-react';
import { useChatStore } from '../stores/chatStore';

export default function MessageInput() {
  const { message, handleSubmit, handleChange, handleStop } = useMessageForm();
  const { isStreaming, isLoading } = useChatStore();

  return (
    <form
      className="flex gap-2 sticky w-full max-w-[480px] border-t-[1px] border-textOpacity50 bottom-0 mx-auto lg:self-start bg-bgColor text-textColor shadow-md items-center"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="rounded-3xl ml-6 my-3 px-4 py-2 bg-containerColor w-full">
        <div className="w-full flex justify-between gap-2">
          <textarea
            className="w-full focus:outline-none bg-transparent text-xs resize-none overflow-hidden"
            placeholder="로로에게 무엇이 궁금한가요?"
            rows={1}
            value={message}
            onChange={handleChange}
            onInput={(e) => {
              const ta = e.currentTarget;
              ta.style.height = 'auto';
              ta.style.height = `${ta.scrollHeight}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                setTimeout(() => {
                  handleSubmit();
                }, 0);
              }
            }}
          />
        </div>
      </div>
      <div
        className={`mr-4 rounded-full p-2 flex justify-center items-center ${
          message.trim() && 'hover:bg-containerColor'
        }`}
      >
        {isLoading || isStreaming ? (
          <CircleStop
            size={20}
            className="transition text-myBlue cursor-pointer"
            onClick={handleStop}
          />
        ) : (
          <Send
            size={20}
            viewBox="0 -2 26 24"
            className={`transition ${
              message.trim()
                ? 'text-myBlue cursor-pointer'
                : 'text-innerContainerColor cursor-default'
            }`}
            onClick={message.trim() ? handleSubmit : undefined}
          />
        )}
      </div>
    </form>
  );
}
