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
    'kakaobase',
    '수강생들만의 진짜 커뮤니티',
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
        url: '/logo.png',
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
        <Image
          src="/chunsik.png"
          alt="surfing"
          width={100}
          height={100}
          className="surfing hidden lg:block"
        />
        <div className="box hidden lg:block">
          <div className="wave -one"></div>
          <div className="wave -two"></div>
          <div className="wave -three"></div>
        </div>
        <Providers>
          <div className="flex w-screen">
            <div className="hidden lg:flex flex-col items-center justify-start mt-40 w-[48%] animate-float">
              <Image
                src="/logo_square.svg"
                alt="로고"
                width={0}
                height={0}
                className="w-[20rem] h-auto"
                priority
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
