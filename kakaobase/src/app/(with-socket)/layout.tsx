import SocketContainer from '@/features/socket/container/SocketContainer';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SocketContainer />
      {children}
    </>
  );
}
