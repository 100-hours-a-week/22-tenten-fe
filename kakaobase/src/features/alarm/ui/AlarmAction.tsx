import { LucideIcon } from 'lucide-react';

interface AlarmActionParams {
  icon: LucideIcon;
  fn: () => void;
}

export default function AlarmAction({ icon: Icon, fn }: AlarmActionParams) {
  return (
    <div
      className="flex w-6 h-6 bg-innerContainerColor hover:bg-myBlue hover:text-textOnBlue rounded-full items-center justify-center cursor-pointer"
      onClick={fn}
    >
      <Icon size={14} />
    </div>
  );
}
