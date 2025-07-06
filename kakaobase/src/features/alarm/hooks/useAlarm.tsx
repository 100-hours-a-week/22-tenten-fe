import { useEffect, useState } from 'react';
import { connectStomp, disconnectStomp } from '../lib/socket';
import { IMessage } from '@stomp/stompjs';
import { AlarmResponse } from '../types/AlarmResponse';

export default function useAlarm() {
  const [alarmList, setAlarmList] = useState<AlarmResponse[]>([]);

  useEffect(() => {
    connectStomp((msg: IMessage) => {
      const parsed: AlarmResponse = JSON.parse(msg.body);

      switch (parsed.event) {
        case 'notification.fetch':
          setAlarmList(parsed.data.notifications);
          break;
        case 'notification.remove.ack':
          setAlarmList((prev) =>
            prev.filter(
              (n) => n.data.notifications.id !== parsed.data.notifications.id
            )
          );
          break;
        default:
          setAlarmList((prev) => [parsed, ...prev]);
          break;
      }
    });

    return () => {
      disconnectStomp();
    }; //메모리 누수 방지
  }, []);

  return { alarmList };
}
