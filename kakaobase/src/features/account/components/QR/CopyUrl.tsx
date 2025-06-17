import { useToast } from '@/app/ToastContext';

export default function CopyUrl({ url }: { url: string }) {
  const { showToast } = useToast();

  const handleCopy = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      showToast('복사 완료! ✌️');
    } catch (err) {
      showToast('복사 실패 😭');
    }
  };

  return (
    <div className="flex w-full items-center justify-between rounded px-2 py-1 bg-innerContainerColor">
      <div className="truncate text-xs text-textColor" title={url}>
        {url}
      </div>
      <button
        className="text-xs text-myLightBlue hover:underline"
        onClick={handleCopy}
      >
        복사
      </button>
    </div>
  );
}
