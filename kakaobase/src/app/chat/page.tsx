import ChatList from '@/features/chat/ui/ChatList';
import Header from '@/widgets/header/Header';
import NavBar from '@/widgets/navbar/NavBar';

export default function Page() {
  return (
    <div className="flex flex-col h-screen scroll-none">
      <Header label="로로 CHAT" />
      <ChatList />
      <NavBar />
    </div>
  );
}
