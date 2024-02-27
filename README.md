## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

<br />

## CSS

### CLSX

###### <a href="https://www.npmjs.com/package/clsx">clsx library</a>

상태나 다른 조건에 따라 요소의 스타일을 조건부로 지정해야 하는 경우 라이브러리를 통해 쉽게 전환 가능

`npm install --save clsx`

```typescript
import clsx from 'clsx';
// or
import { clsx } from 'clsx';

export default function Sample({ status }: { status: string }) {
  return (
    <p
      className={clsx(
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
    // ... other codes ...
)}
```

status = 'pending' || 'paid' <br />
'paid' 상태라면 녹색으로 'pending' 상태라면 회색으로 보이게 설정 가능 <br />

<br />
<hr />

### Optimize Font

##### 글꼴(font)를 최적화하는 이유는?

<p align="center">
<img src="https://github.com/55555-Jyeon/nextTutorial/assets/134191817/9882439d-8c62-47b0-98eb-af2e20b1e4ba" />
</p>

글꼴을 사용하면 브라우저가 처음에 대체 글꼴이나 시스템 글꼴로 텍스트를 렌더링한 다음 로드된 후 사용자 지정 글꼴로 교체할 때 레이아웃 변경이 발생합니다. <br />
이 교체로 인해 텍스트 크기, 간격 또는 레이아웃이 변경되고 그 주위의 요소가 이동될 수 있습니다. <br />

Next.js는 모듈을 사용할 때 애플리케이션의 글꼴을 `next/font`를 통해 자동으로 최적화합니다. (build 시 글꼴 파일을 다운로드하고 다른 정적 자산과 함께 호스팅) <br /> 따라서 사용자가 애플리케이션을 방문할 때 성능에 영향을 미칠 수 있는 글꼴에 대한 추가 네트워크 요청을 하지 않아도 됩니다.

#### basic fonts

1️⃣ `app/ui` 폴더 하위에 `fonts.ts` 파일 생성
2️⃣ `next/font/google`에서 글꼴 가져오기 → 하위 집합(subsets) 설정

```typescript
import { Inter } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });
```

3️⃣ `app/layout.tsx`에 적용

```typescript
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
```

<body>에 inter 요소를 추가하면 해당 글꼴이 애플리케이션 전체에 적용 <br />
antialiased → 글꼴을 부드럽게 만드는 클래스 (tailwind) <br />

## multi-fonts

애플리케이션의 특정 요소에 글꼴 적용 가능 → <a href="https://nextjs.org/docs/app/building-your-application/optimizing/fonts#using-multiple-fonts">공식 홈페이지 참고</a><br />

<br />

1️⃣ 각각 export

글꼴을 내보내고, 가져와서 className필요한 곳에 적용하는 유틸리티 기능을 만드는 것입니다.
이렇게 하면 글꼴이 렌더링될 때만 미리 로드됩니다.

```typescript
import { Inter, Roboto_Mono } from 'next/font/google';

// main font
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});
// sub font
export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
});
```

이렇게 할 경우 Inter는 전역적으로 적용되는 상태에서 Roboto Mono는 필요에 따라 import해서 적용할 수 있습니다.

```typescript
// app/layout.tsx
import { inter } from './fonts'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div>{children}</div>
      </body>
    </html>
  )
}

// app/page.tsx
import { roboto_mono } from './fonts'

export default function Page() {
  return (
    <>
      <h1 className={roboto_mono.className}>My page</h1>  /* 특정 요소에만 적용 */
    </>
  )
}
```

<br />

2️⃣ CSS 변수 생성

```typescript
// app/layout.tsx
import { Inter, Roboto_Mono } from 'next/font/google'
import styles from './global.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
})

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
      <body>
        <h1>My App</h1>
        <div>{children}</div>
      </body>
    </html>
  )
}
```

이렇게 사용하는 경우 Inter는 전역적으로 적용되며 Roboto Mono는 모든 h1 태그의 스타일에 지정됩니다.

```typescript
// app/ui/global.css

html {font-family: var(--font-inter);}
h1 {font-family: var(--font-roboto-mono);}
```

3️⃣ 페이지마다 특정 font 적용하기

<br />

<hr />
