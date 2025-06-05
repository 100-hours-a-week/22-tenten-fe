import api from './api';

//팔로우 요청 api
export async function postFollow({ id }: { id: number }) {
  try {
    const response = await api.post(`/users/${id}/follows`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

//팔로우 취소 api
export async function deleteFollow({ id }: { id: number }) {
  try {
    const response = await api.delete(`/users/${id}/follows`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

//팔로워 목록 조회
export async function getFollowers({
  userId,
  limit,
  cursor,
}: {
  userId: number;
  limit: number;
  cursor: number;
}) {
  try {
    const response = await api.get(
      `/users/${userId}/followers?limit=${limit}&cursor=${cursor}`
    );
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}

//팔로잉 목록 조회
export async function getFollowings({
  userId,
  limit,
  cursor,
}: {
  userId: number;
  limit: number;
  cursor: number;
}) {
  try {
    const response = await api.get(
      `/users/${userId}/followings?limit=${limit}&cursor=${cursor}`
    );
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}
