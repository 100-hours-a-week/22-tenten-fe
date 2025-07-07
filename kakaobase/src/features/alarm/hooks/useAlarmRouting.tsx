import { useRouter } from 'next/navigation';
import { sendNotificationCommand } from '../lib/socket';

export default function useAlarmRouting({ data }: { data: any }) {
  const router = useRouter();

  function goToPost() {
    if (!data.is_read) {
      sendNotificationCommand('notification.read', {
        id: data.id,
        timestamp: new Date().toISOString().split('.')[0],
      });
    }
    router.push(`/post/${data.target_id}`);
  }
  function goToProfile() {
    if (!data.is_read) {
      sendNotificationCommand('notification.read', {
        id: data.id,
        timestamp: new Date().toISOString().split('.')[0],
      });
    }
    router.push(`/profile/${data.sender.id}`);
  }
  return { goToPost, goToProfile };
}
