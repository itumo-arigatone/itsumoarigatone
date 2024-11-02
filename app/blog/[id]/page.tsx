import BlogDetail from '@/app/_components/_blog/BlogDetail'
import { BlogDetailMeta } from '@/app/_components/_blog/BlogDetailMeta'
import { Metadata } from 'next';

export const metadata: Metadata = BlogDetailMeta()


export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <BlogDetail id={params.id} />
    </>
  );
};