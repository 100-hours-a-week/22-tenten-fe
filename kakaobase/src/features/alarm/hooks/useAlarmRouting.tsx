import { sendNotificationCommand } from '@/features/socket/lib/socket';
import useRoutings from '@/shared/hooks/useRoutings';

export default function useAlarmRouting({ data }: { data: any }) {
  const { goPostDetail, goProfile } = useRoutings();

  function goToPost() {
    if (!data.is_read) {
      sendNotificationCommand('notification.read', {
        id: data.id,
        timestamp: new Date().toISOString().split('.')[0],
      });
    }
    goPostDetail(data.target_id);
  }
  function goToProfile() {
    if (!data.is_read) {
      sendNotificationCommand('notification.read', {
        id: data.id,
        timestamp: new Date().toISOString().split('.')[0],
      });
    }
    goProfile(data.sender_id);
  }
  return { goToPost, goToProfile };
}
