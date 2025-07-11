import Image from 'next/image';
import { PostEntity } from '../types/post';
import extractYoutubeVideoId from '../posts/lib/formatYoutube';

export default function YoutubeFrame({ post }: { post: PostEntity }) {
  if (post.type === 'post' && 'youtubeUrl' in post && post.youtubeUrl) {
    if (
      post.youtubeSummary !== 'YOUTUBE_VIDEO_NOT_FOUND' &&
      post.youtubeSummary !== 'INVALID_YOUTUBE_URL'
    ) {
      return (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${extractYoutubeVideoId(
            post.youtubeUrl
          )}`}
          title="유튜브 영상"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="w-full h-full aspect-video"
        ></iframe>
      );
    } else if (
      post.youtubeSummary === 'YOUTUBE_VIDEO_NOT_FOUND' ||
      post.youtubeSummary === 'INVALID_YOUTUBE_URL'
    ) {
      return (
        <div className="w-full h-full aspect-video relative object-fit">
          <Image src="/youtube_not_found.png" alt="이미지 없음" fill priority />
        </div>
      );
    }
  }
  return null;
}
