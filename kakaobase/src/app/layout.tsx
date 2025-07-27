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
    icon: '/logo_square.png',
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
        <div className="absolute flex items-end bottom-40">
          <div className="relative h-24 w-24">
            <Image
              src="/chunsik.png"
              alt="surfing"
              fill
              sizes="(max-width : 1024px) 10vw, 96px"
              priority
              className="surfing object-contain hidden lg:block"
            />
          </div>
        </div>
        <div className="box hidden lg:block">
          <div className="wave -one"></div>
          <div className="wave -two"></div>
          <div className="wave -three"></div>
        </div>
        <Providers>
          <div className="flex w-screen">
            <div className="hidden lg:flex flex-col items-center justify-start mt-40 w-[48%] animate-float">
              <div className="relative w-72 h-72">
                <Image
                  src="/logo_square.png"
                  alt="로고"
                  fill
                  sizes="(max-width: 1024px) 20vw, 288px"
                  priority
                  className="object-contain"
                />
              </div>
              <div className="relative w-96 h-20">
                <Image
                  src="/logo_title.png"
                  alt="로고"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 20vw, 384px"
                  priority
                />
              </div>
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
