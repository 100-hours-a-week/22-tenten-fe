import { LoaderCircle } from 'lucide-react';

export default function LoadingSmall() {
  return (
    <div className="text-xs flex flex-col justify-center text-center items-center gap-2 text-textColor">
      <LoaderCircle width={12} height={12} className="animate-spin" />
      <div>로딩 중...</div>
    </div>
  );
}
