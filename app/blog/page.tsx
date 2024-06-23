import Link from 'next/link';
import Header from "@/app/(components)/SimpleHeader";
import Footer from "@/app/(components)/Footer";
import { PrismaClient } from '@prisma/client';
import '../stylesheets/blog/page.css';
import { use } from 'react';
import { formatDate } from '../../lib/formatDate';

async function GetBlogs() {
  'use server'
  const prisma = new PrismaClient();
  return await prisma.post.findMany();
}

const BlogList = () => {
  const posts = use(GetBlogs());

  return (
    <>
      <Header />
      <section>
        <h1 className="text-center font-bold text-sub">Itsumoarigatoneのブログ</h1>
        <h2 className="text-center font-bold text-sub">趣味でバッグやポーチを作っている人のブログを是非見ていってね</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.id}`}>
                <h3 className="text-sub">{post.title}</h3>
                <div className="text-accent blog-created">
                  {formatDate(post.created_at)}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <Footer />
    </>
  );
};

export default BlogList;