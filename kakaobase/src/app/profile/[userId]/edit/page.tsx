import Header from '@/widgets/header/Header';
import NavBar from '@/widgets/navbar/NavBar';
import EditWrapper from '@/features/account/ui/edit/EditWrapper';

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      <Header label="프로필 편집" />
      <EditWrapper />
      <NavBar />
    </div>
  );
}
