import { refreshToken } from '@/apis/login';
import { getClientCookie } from '@/lib/getClientCookie';
import { useRouter } from 'next/navigation';

export default function useTokenCheck() {
  const router = useRouter();
  async function checkUnauthorized() {
    const accessToken = getClientCookie('accessToken');
    if (!accessToken) {
      try {
        const response = await refreshToken();
        document.cookie = `accessToken=${response.data.access_token}; path=/; secure; samesite=lax; max-age=1800`; //30분
      } catch (e: any) {
        console.log(e);
        if (
          e.response?.data.error === 'refresh_token_invalid' ||
          e.response?.data.error === 'refresh_token_missing'
        ) {
          router.push('/login');
        }
      }
    }
  }
  return { checkUnauthorized };
}
