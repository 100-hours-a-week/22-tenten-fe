import Header from '@/widgets/header/Header';
import NavBar from '@/widgets/navbar/NavBar';
import EditWrapper from '@/features/account/ui/edit/EditWrapper';

export default function Page({ params }: { params: { userId: number } }) {
  return (
    <div className="flex flex-col h-screen w-full scroll-none">
      <Header label="프로필 편집" />
      <div className="flex-grow flex flex-col h-screen items-center justify-center w-full">
        <EditWrapper userId={params.userId} />
      </div>
      <NavBar />
    </div>
  );
}
