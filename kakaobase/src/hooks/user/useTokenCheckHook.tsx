import { refreshToken } from '@/apis/login';
import { useToast } from '@/app/ToastContext';
import { getClientCookie } from '@/lib/getClientCookie';
import { useRouter } from 'next/navigation';

export default function useTokenCheck() {
  const router = useRouter();
  const { showToast } = useToast();
  async function checkUnauthorized() {
    const accessToken = getClientCookie('accessToken');
    if (!accessToken) {
      try {
        const response = await refreshToken();
        document.cookie = `accessToken=${response.data.access_token}; path=/; secure; samesite=lax; max-age=1800`; //30분
      } catch (e: any) {
        if (
          e.response?.data.error === 'refresh_token_invalid' ||
          e.response?.data.error === 'refresh_token_missing'
        ) {
          showToast('다시 로그인 해 주세요. 😊');
        } else {
          showToast('문제 발생! 다시 로그인 해 주세요. 😭');
        }
        router.push('/login');
      }
    }
  }
  return { checkUnauthorized };
}
