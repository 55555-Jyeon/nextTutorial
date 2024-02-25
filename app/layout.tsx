import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

/* 
font 최적화하기

<body> className에 추가, 해당 글꼴이 애플리케이션 전체에 적용
antialiased : 글꼴을 부드럽게 만드는 클래스
*/

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
