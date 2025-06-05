import { useState } from 'react';

export default function CopyUrl({ url }: { url: string }) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('클립보드 복사 실패', err);
    }
  };
  return (
    <div className="flex w-full items-center justify-between rounded px-2 py-1 bg-innerContainerColor">
      <div className="truncate text-xs text-textColor" title={url}>
        {url}
      </div>
      <button
        className="text-xs text-myBlue hover:underline"
        onClick={handleCopy}
      >
        {copied ? '복사 완료!' : '복사'}
      </button>
    </div>
  );
}
