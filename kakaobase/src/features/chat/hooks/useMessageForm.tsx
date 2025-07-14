import { sendChatCommand } from '@/features/alarm/lib/socket';
import { useToast } from '@/shared/hooks/ToastContext';
import { useState } from 'react';
import { useChatStore } from '../stores/chatStore';

export default function useMessageForm() {
  const [message, setMessage] = useState('');
  const { showToast } = useToast();
  const { streamId, isStreaming, isLoading, startLoading, clear } =
    useChatStore();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    sendChatCommand('chat.typing', {
      timestamp: new Date().toISOString().split('.')[0],
    });
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    if (!message.trim() || isStreaming || isLoading) return;
    try {
      console.log('보낼 때 : ', message);
      sendChatCommand('chat.send', {
        content: message,
        timestamp: new Date().toISOString().split('.')[0],
      });
      setMessage('');
      startLoading();
    } catch (e: any) {
      if (e.response.data.error === 'invalid_format') {
        showToast('댓글은 최대 2000자까지 작성할 수 있습니다. 😭');
      } else showToast('문제 발생! 잠시 후 다시 시도해 주세요. 😭');
    }
  };

  function handleStop() {
    if (isStreaming || isLoading) {
      try {
        sendChatCommand('chat.stop', {
          stream_id: streamId,
          timestamp: new Date().toISOString().split('.')[0],
        });
        clear();
      } catch (e: any) {
        showToast('문제 발생! 자동으로 응답 생성이 중단되었습니다. 😭');
      }
    }
  }

  return { message, handleChange, handleSubmit, handleStop };
}
