import Header from '@/shared/ui/header/Header';
import NavBar from '@/shared/ui/NavBar';
import EditWrapper from '@/features/account/components/edit/EditWrapper';

export default function Page() {
  return (
    <div>
      <div>
        <Header label="프로필 편집" />
        <EditWrapper />
        <NavBar />
      </div>
    </div>
  );
}
