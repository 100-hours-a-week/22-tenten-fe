import useSocket from '@/features/socket/hooks/useSocket';

export default function AlarmBadgeClient({
  children,
}: {
  children: React.ReactNode;
}) {
  useSocket();
  return <>{children}</>;
}
