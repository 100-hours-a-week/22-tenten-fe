import AlarmContainer from '@/features/alarm/ui/AlarmContainer';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AlarmContainer />
      {children}
    </>
  );
}
