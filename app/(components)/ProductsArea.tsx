import Product from './Product';
import { PrismaClient } from '@prisma/client';
import { use } from 'react';

type ProductProps = {
  id: number;
  name: string;
  price: number;
  description: string;
  slug: string;
}

async function GetAllProducts() {
  'use server'

  const prisma = new PrismaClient();

  const product = await prisma.product.findMany();

  if (!product) {
    return null;
  }

  return product;
}

export default function ProductsArea() {
  const products = use(GetAllProducts()) as Array<ProductProps>
  // 必要なデータ
  // 画像、タイトル、値段、色
  return (
    <div id="products-area" className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {products.map((product, index) => (
        <Product key={index} img={''} title={product.name} price={product.price} colors={[]} product_key={product.slug} />
      ))}
    </div>
  )
}
