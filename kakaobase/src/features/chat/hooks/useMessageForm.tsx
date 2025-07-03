import { useToast } from '@/shared/hooks/ToastContext';
import { useState } from 'react';

export default function useMessageForm() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    if (!message.trim() || loading) return;
    try {
      setLoading(true);
      //await 메시지 전송 api 제출
      setMessage('');
    } catch (e: any) {
      if (e.response.data.error === 'invalid_format') {
        showToast('댓글은 최대 2000자까지 작성할 수 있습니다. 😭');
      } else showToast('문제 발생! 잠시 후 다시 시도해 주세요. 😭');
    } finally {
      setLoading(false);
    }
  };

  function handleStop() {
    if (loading) {
      try {
        //응답 받기 stop
        setLoading(false);
      } catch (e: any) {
        showToast('문제 발생! 자동으로 응답 생성이 중단되었습니다. 😭');
      }
    }
  }

  return { message, handleChange, handleSubmit, loading, handleStop };
}
