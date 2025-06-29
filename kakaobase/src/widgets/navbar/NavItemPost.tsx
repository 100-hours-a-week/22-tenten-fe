import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NavItemPost() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push('/post/new');
      }}
      className="mb-2 w-16 h-16 rounded-full flex items-center justify-center bg-myBlue shadow-[0_4px_16px_rgba(44,102,255,0.6)]"
    >
      <Plus className="w-8 h-16 text-textOnBlue align-middle" />
    </button>
  );
}
