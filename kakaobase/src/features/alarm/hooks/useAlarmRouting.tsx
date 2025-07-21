import { useRouter } from 'next/navigation';
import { sendNotificationCommand } from '../../socket/lib/socket';
import { AlarmItemData } from '../types/AlarmResponse';
import { queryClient } from '@/shared/api/queryClient';
import { alarmQueries } from '../api/alarmQueries';

export default function useAlarmRouting({ data }: { data: AlarmItemData }) {
  const router = useRouter();

  function goToPost() {
    if (!data.is_read) {
      sendNotificationCommand('notification.read', {
        id: data.id,
        timestamp: new Date().toISOString().split('.')[0],
      });
      queryClient.invalidateQueries({ queryKey: alarmQueries.alarmsKey() });
    }
    router.push(`/post/${data.target_id}`);
  }
  function goToProfile() {
    if (!data.is_read) {
      sendNotificationCommand('notification.read', {
        id: data.id,
        timestamp: new Date().toISOString().split('.')[0],
      });
      queryClient.invalidateQueries({ queryKey: alarmQueries.alarmsKey() });
    }
    router.push(`/profile/${data.sender.id}`);
  }
  return { goToPost, goToProfile };
}
