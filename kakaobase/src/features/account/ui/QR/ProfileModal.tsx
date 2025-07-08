'use client';

import { useState, useEffect } from 'react';
import QrCode from './QrCode';
import CopyUrl from './CopyUrl';

interface ShareQrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ShareQrModalProps) {
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.href);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-textOpacity50 z-50" onClick={onClose}>
      <div className="flex w-screen px-6">
        <div className="hidden lg:flex flex-col items-center justify-center w-[48%]"></div>
        <div className="flex flex-col h-screen justify-center w-full max-w-[480px] mx-auto lg:ml-12 lg:self-start">
          <div
            className="relative bg-containerColor rounded-lg p-6 w-full max-w-sm mx-auto animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-textColor rounded-full w-6 h-6 text-xs hover:bg-textOpacity50 "
              onClick={onClose}
            >
              ✕
            </button>

            <div className="flex flex-col items-center gap-6">
              {url ? (
                <QrCode url={url} size={180} />
              ) : (
                <div className="text-md text-textColor">QR 코드 로딩 중...</div>
              )}
              <CopyUrl url={url} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
