import { queryClient } from '@/shared/api/queryClient';
import { sendNotificationCommand } from '../../socket/lib/socket';
import { alarmQueries } from '../api/alarmQueries';
import useRoutings from '@/shared/hooks/useRoutings';

export default function useAlarmRouting({ data }: { data: any }) {
  const { goPostDetail, goProfile } = useRoutings();

  function goToPost() {
    if (!data.is_read) {
      sendNotificationCommand('notification.read', {
        id: data.id,
        timestamp: new Date().toISOString().split('.')[0],
      });
      queryClient.invalidateQueries({ queryKey: alarmQueries.alarmsKey() });
    }
    goPostDetail(data.target_id);
  }
  function goToProfile() {
    if (!data.is_read) {
      sendNotificationCommand('notification.read', {
        id: data.id,
        timestamp: new Date().toISOString().split('.')[0],
      });
      queryClient.invalidateQueries({ queryKey: alarmQueries.alarmsKey() });
    }
    goProfile(data.sender_id);
  }
  return { goToPost, goToProfile };
}
