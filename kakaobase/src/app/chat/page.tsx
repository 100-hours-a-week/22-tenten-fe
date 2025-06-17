import Header from '@/components/common/header/Header';
import NavBar from '@/components/common/NavBar';

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow">
        <Header label="채팅 목록" />
        <div>로로와의 채팅방에 오신 것을 환영합니다.</div>
      </div>
      <NavBar />
    </div>
  );
}
