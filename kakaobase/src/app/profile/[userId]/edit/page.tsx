import Header from '@/shared/ui/header/Header';
import NavBar from '@/shared/ui/NavBar';
import Wrapper from '@/features/account/components/edit/Wrapper';

export default function Page() {
  return (
    <div>
      <div>
        <Header label="프로필 편집" />
        <Wrapper />
        <NavBar />
      </div>
    </div>
  );
}
