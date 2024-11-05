import type { MetadataRoute } from 'next'
import { getAllProducts } from '@/lib/product/getAllProducts';
import { getActiveBlogsWithoutImage } from '@/lib/blog/getActiveBlogsWithoutImage'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();
  const products_detail = products.map((product) => ({
    url: `https://www.itsumoarigatone.com/product/${product.slug}`,
    lastModified: product.created_at,
  }));

  const blogs = await getActiveBlogsWithoutImage();
  const blogs_detail = blogs.map((blog) => ({
    url: `https://www.itsumoarigatone.com/blog/${blog.id}`,
    lastModified: blog.created_at,
  }));

  const list = [
    {
      url: 'https://www.itsumoarigatone.com',
      lastModified: new Date()
    },
    {
      url: 'https://www.itsumoarigatone.com/blog/',
      lastModified: new Date()
    }
  ];
  // 配列の結合
  return [...list, ...products_detail, ...blogs_detail];
}