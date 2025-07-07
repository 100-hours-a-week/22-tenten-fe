import { useRouter } from 'next/navigation';
import { sendNotificationCommand } from '../lib/socket';

export default function useAlarmRouting({ data }: { data: any }) {
  const router = useRouter();

  function goToPost() {
    sendNotificationCommand('notification.read', {
      id: data.id,
      timestamp: new Date().toISOString().split('.')[0],
    });
    router.push(`/post/${data.target_id}`);
  }
  function goToProfile() {
    sendNotificationCommand('notification.read', {
      id: data.id,
      timestamp: new Date().toISOString().split('.')[0],
    });
    router.push(`/profile/${data.sender.id}`);
  }
  return { goToPost, goToProfile };
}
