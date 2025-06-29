import Header from '@/widgets/header/Header';
import NavBar from '@/widgets/navbar/NavBar';

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      <Header label="로로 CHAT" />
      <div className="h-screen flex flex-col justify-center items-center">
        <div>로로와의 채팅방에 오신 것을 환영합니다.</div>
        <div>준비 중인 기능입니다.</div>
      </div>
      <NavBar />
    </div>
  );
}
