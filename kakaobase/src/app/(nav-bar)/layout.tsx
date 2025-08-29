import NavBar from '@/widgets/navbar/NavBar';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen justify-center scrollbar-hide w-full max-w-[480px] my-32 mx-auto">
      {children}
      <NavBar />
    </div>
  );
}
