import formatDate from '@/features/feeds/lib/formatDate';
import Image from 'next/image';

export default function BotChat() {
  const text = '안녕';
  return (
    <div className="px-6 py-4 flex flex-col gap-2 w-full">
      <div className="flex gap-2 justify-start items-end">
        <div className="relative w-6 h-6">
          <Image
            src="/roro.png"
            fill
            sizes="0"
            alt="roro"
            className="rounded-md"
          />
        </div>
        <div className="text-sm px-3 py-2 rounded-xl max-w-[64%] flex bg-myLightBlue text-textOnLight">
          {text}
        </div>
        <div className="text-xs opacity-40">
          {formatDate('2025-07-02', false)}
        </div>
      </div>
    </div>
  );
}
