import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '【公式】Itsumoarigatoneコレクションサイト',
  description: 'Itsumoarigatone since 2023. 丁寧につくられた新作アイテムを紹介。レザーポーチ、財布、小物などなど。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <Head>
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QL49PN4YYY"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-QL49PN4YYY');
        </script>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
