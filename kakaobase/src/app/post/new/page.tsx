'use client';
import Header from '@/widgets/header/Header';
import PostEditor from '@/features/feeds/posts/components/PostEditor';

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      <Header label="게시글 작성" />
      <div className="overflow-y-auto mt-16">
        <PostEditor />
      </div>
    </div>
  );
}
