// __tests__/components/category/CategoryProducts.test.tsx

import { render, screen, waitFor } from '@testing-library/react';
import CategoryProducts from '@/app/_components/_category/CategoryProducts';
import { vi, describe, it, expect } from 'vitest';

// モック関数を先に定義
const mockGetCategoryProducts = vi.hoisted(() =>
  vi.fn(async (categoryId) => ({
    products: [
      { id: 1, name: 'Product 1', price: 100, description: 'Description 1', slug: 'product-1', images: [] },
      { id: 2, name: 'Product 2', price: 200, description: 'Description 2', slug: 'product-2', images: [] },
    ],
  }))
);

// `getCategoryProducts` をモック化
vi.mock('@/lib/product/getCategoryProducts', () => ({
  getCategoryProducts: mockGetCategoryProducts,
}));

vi.mock('@/app/_components/LoadingAnimation', () => ({
  default: () => <div data-testid="loading-animation">Loading...</div>,
}));

vi.mock('@/app/_components/ProductsArea', () => ({
  default: ({ products }: { products: ProductProps[] }) => (
    <div data-testid="products-area">
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  ),
}));

describe('CategoryProducts', () => {
  it('ローディング中にローディングアニメーションを表示する', () => {
    mockGetCategoryProducts.mockImplementation(() => new Promise(() => { })); // 永遠に解決しないPromise
    render(<CategoryProducts categoryId={1} />);

    // ローディングアニメーションが表示されることを確認
    expect(screen.getByTestId('loading-animation')).toBeInTheDocument();
  });

  it('データ取得が成功した場合、ProductsAreaを表示する', async () => {
    mockGetCategoryProducts.mockResolvedValue({
      products: [
        { id: 1, name: 'Product 1', price: 100, description: 'Description 1', slug: 'product-1', images: [] },
        { id: 2, name: 'Product 2', price: 200, description: 'Description 2', slug: 'product-2', images: [] },
      ],
    });
    render(<CategoryProducts categoryId={1} />);

    await waitFor(() => {
      expect(screen.getByTestId('products-area')).toBeInTheDocument();
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });

  it('categoryIdが指定されていない場合、エラーメッセージが表示される', async () => {
    mockGetCategoryProducts.mockResolvedValue({
      products: [
        { id: 1, name: 'Product 1', price: 100, description: 'Description 1', slug: 'product-1', images: [] },
        { id: 2, name: 'Product 2', price: 200, description: 'Description 2', slug: 'product-2', images: [] },
      ],
    });

    render(<CategoryProducts categoryId={undefined} />);

    await waitFor(() => {
      expect(screen.getByText(/商品情報の取得に失敗しました/i)).toBeInTheDocument();
    });
  });
});
