import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import Image from 'next/image';
import GoogleAnalytics from '@/shared/lib/GoogleAnalytics';

export const metadata: Metadata = {
  metadataBase: new URL('https://kakaobase.com'),
  title: '카카오베이스',
  description: '카카오테크 부트캠프 커뮤니티',
  keywords: [
    // '카카오테크 부트캠프 2기',
    // '카카오테크 부트캠프',
    'kakaobase',
    // '카카오테크 부트캠프 커뮤니티',
    // '카카오테크 부트캠프 지원',
    // '카카오테크 부트캠프 접수',
    // '카카오테크 부트캠프 3기 모집',
    // '카카오테크 부트캠프 후기',
    // '카테부 후기',
    '수강생들만의 진짜 커뮤니티',
    // 'kakaotech bootcamp',
    // '카카오테크',
    // '카카오 부트캠프',
    // '카카오테크 부트캠프 프로젝트',
    '카카오테크 부트캠프 2기 텐텐',
    '카카오 베이스',
  ],
  openGraph: {
    title: '카카오베이스',
    description: '카카오테크 부트캠프만의 진짜 커뮤니티 - 카카오베이스',
    url: 'https://kakaobase.com',
    type: 'website',
    images: [
      {
        url: '/logo.svg',
        width: 1200,
        height: 630,
        alt: '카카오베이스',
      },
    ],
  },
  icons: {
    icon: '/logo_square.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`bg-animated-gradient sm:bg-animated-gradient`}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
          <GoogleAnalytics
            googleAnalyticsId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}
          />
        )}
        <Providers>
          <div className="flex w-screen">
            <div className="hidden lg:flex flex-col items-center justify-center w-[48%] active:animate-bounce">
              <Image
                src="/logo_square.svg"
                alt="로고"
                width={0}
                height={0}
                className="w-[20rem] h-auto"
              />
              <Image
                src="/logo_title.svg"
                alt="로고"
                width={0}
                height={0}
                className="w-[24rem] h-auto"
              />
            </div>
            <div className="flex flex-col h-screen justify-center scrollbar-hide w-full max-w-[480px] mx-auto lg:ml-12 lg:self-start bg-bgColor text-textColor shadow-md">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
