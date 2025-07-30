import UnauthorizedModal from '@/features/auth/ui/UnauthorizedModal';
import HeaderMain from '@/widgets/header/HeaderMain';

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      <HeaderMain />
      <UnauthorizedModal />
    </div>
  );
}
