import { Course } from '@/shared/types/Course';
import api from '@/shared/api/api';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  data: {
    class_name: Course;
    nickname: string;
    member_id: string;
    image_url: string;
  };
}

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const response = await api.post('/auth/tokens', payload);
  return response.data;
}
