import Header from '@/widgets/header/Header';
import NavBar from '@/widgets/navbar/NavBar';

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      <Header label="알림 목록" />
      <div className="flex-grow">알림 목록 페이지입니다.</div>
      <NavBar />
    </div>
  );
}
