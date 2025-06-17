'use client';
import Header from '@/shared/ui/header/Header';
import PostEditor from '@/features/posts/components/PostEditor';

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
