import './globals.css'
import type { Metadata } from 'next';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';

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
        <GoogleAnalytics gaId="G-QL49PN4YYY" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
