import { Noto_Sans_KR } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import AppHeader from '@/components/layout/AppHeader';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-sans',
});

const baskinsRobbins = localFont({
  src: '../../public/fonts/배스킨라빈스B.otf',
  weight: '700',
  variable: '--font-display',
});

export const metadata = {
  title: '최애의 포토',
  description: '나만의 포토카드를 만들고 거래하세요',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ko"
      className={`${notoSansKR.variable} ${baskinsRobbins.variable}`}
    >
      <body className="bg-black antialiased">
        <div className="min-h-screen flex flex-col">
          <AppHeader />

          <main className="flex-1 w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
