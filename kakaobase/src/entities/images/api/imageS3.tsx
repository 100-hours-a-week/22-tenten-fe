import api from '../../../shared/lib/api';

export default async function postToS3(
  file: File,
  type: 'profile_image' | 'post_image'
): Promise<string> {
  const response = await api.get(
    `/images/presigned-url?fileName=${file.name}&fileSize=${file.size}&mimeType=${file.type}&type=${type}`
  );

  const url = response.data.data.presigned_url;

  await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
    mode: 'cors',
  }).catch((error) => {
    console.error('이미지 업로드 실패:', error);
    throw error;
  });

  return response.data.data.image_url;
}
