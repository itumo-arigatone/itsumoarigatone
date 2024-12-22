import './globals.css'
import type { Metadata } from 'next';
import Head from 'next/head'
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '【公式】Itsumoarigatoneレザーコレクションサイト',
  description: 'Itsumoarigatone since 2023. 丁寧につくられたレザーアイテムを紹介。ポーチ、財布、小物などなど。',
  openGraph: {
    images: ["/ogp.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <Head>
        <meta property="og:title" content="Itsumoarigatoneコレクションサイト" />
        <meta property="og:description" content="Itsumoarigatone since 2023. レザーアイテムを紹介。レザーポーチ、財布、小物などなど。" />
        <meta property="og:image" content="/logo_medium.svg" />
        <meta property="og:url" content="https://www.itsumoarigatone.com" />
        <meta name="twitter:card" content="/logo_medium.svg" />
        <meta name='twitter:title' content='Itsumoarigatoneコレクションサイト' />
        <meta name='twitter:description' content='Itsumoarigatone since 2023. レザーアイテムを紹介。レザーポーチ、財布、小物などなど。' />
        <meta name='twitter:image' content='/logo_medium.svg' />
      </Head>
      <body className={inter.className}>{children}</body>
      <GoogleAnalytics gaId="G-QL49PN4YYY" />
    </html>
  )
}
