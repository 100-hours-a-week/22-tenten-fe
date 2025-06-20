import { useToast } from '@/shared/hooks/ToastContext';

export default function Toast() {
  const { isOpen, label } = useToast();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 pointer-events-none">
      <div className="flex mt-6">
        <div className="hidden lg:flex flex-col w-[48%]"></div>
        <div className="flex justify-center max-w-[480px] w-full mx-auto lg:ml-12 lg:self-start">
          <div className="flex animate-slide-in bg-textColor rounded-lg shadow-md">
            <div className="flex px-4 py-2">
              <div className="text-bgColor">{label}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
