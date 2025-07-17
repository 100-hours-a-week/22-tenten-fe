import { useToast } from '@/shared/hooks/ToastContext';
import { useEffect, useState } from 'react';

export default function Toast() {
  const { isOpen, label } = useToast();
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isOpen) return;

    setProgress(100);
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.max(0, 100 - (elapsed / 3000) * 100);
      setProgress(percent);
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] pointer-events-none">
      <div className="flex mt-6">
        <div className="hidden lg:flex flex-col w-[48%]"></div>
        <div className="flex justify-center max-w-[480px] w-full mx-auto lg:ml-12 lg:self-start">
          <div className="flex animate-slide-in bg-textColor rounded-lg shadow-md flex-col">
            <div className="flex px-4 py-2">
              <div className="text-bgColor">{label}</div>
            </div>
            <div className="h-1 w-full px-2 rounded-full">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-100 via-yellow-200 via-blue-400 via-purple-600 to-pink-800 transition-all duration-100 linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
