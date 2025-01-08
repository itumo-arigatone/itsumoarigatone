'use server'

import { PrismaClient, CategoryClosure } from '@prisma/client';


export default async function generateCategoryPaths() {
  // 全ての閉包テーブルデータを取得
  const prisma = new PrismaClient();
  const closureData = await prisma.categoryClosure.findMany({
    include: {
      ancestor: true, // 親カテゴリの情報を取得
      descendant: true, // 子カテゴリの情報を取得
    },
  });

  // データを整理してカテゴリ階層を作成
  const urlMap = new Map<number, string>(); // URL をカテゴリ ID ごとに保存
  closureData.forEach(({ ancestorId, descendantId, descendant }) => {
    if (!descendant) return; // descendant が存在しない場合スキップ

    const ancestorUrl = urlMap.get(ancestorId) || ''; // 親カテゴリの URL を取得
    const currentUrl = `${ancestorUrl}/${descendant.slug}`; // 子カテゴリの URL を生成
    urlMap.set(descendantId, currentUrl); // 子カテゴリの ID に対応する URL を保存
  });

  // URL の一覧を取得
  const urls = Array.from(urlMap.values());

  return urls;
};

