export interface UserBasic {
  id: number;
  name?: string;
  nickname: string;
  image_url: string | null;
  is_followed?: boolean;
}
