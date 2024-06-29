import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import '@/stylesheets/blog/page.css';
import { use } from 'react';
import { formatDate } from '@/lib/formatDate';

async function GetBlogs() {
  'use server'
  const prisma = new PrismaClient();
  return await prisma.post.findMany();
}

const BlogList = () => {
  const posts = use(GetBlogs());

  return (
    <div>
      <section className='text-sub'>
        <Link href="new">新しいブログを書く</Link>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`${post.id}`}>
                <h3 className="text">{post.title}</h3>
                <div className="text-accent blog-created">
                  {formatDate(post.created_at)}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default BlogList;