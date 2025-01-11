import { render, screen, waitFor } from "@testing-library/react";
import ProductDetail from "@/app/_components/_product/ProductDetail";
import { vi, describe, it, expect } from "vitest";

// モックデータ
const mockProducts = [
  { id: "1", name: "Product 1", price: 1000, description: "Description 1", images: [], baseLink: "" },
  { id: "2", name: "Product 2", price: 2000, description: "Description 2", images: [], baseLink: "" },
];

// モックの設定
const mockGetWithoutCurrentProducts = vi.hoisted(() => (
  vi.fn(async () => mockProducts)
));

vi.mock('@/lib/product/getWithoutCurrentProducts', async () => ({
  getWithoutCurrentProducts: mockGetWithoutCurrentProducts
}))

vi.mock("@/app/_components/LoadingAnimation", () => ({
  default: () => <div data-testid="loading-animation">Loading...</div>,
}));

vi.mock("@/app/_components/_product/ProductRecommend", () => ({
  default: ({ products }: { products: typeof mockProducts }) => (
    <div data-testid="product-recommend">
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  ),
}));

describe("ProductDetail", () => {
  it("ローディング中にローディングアニメーションを表示する", async () => {
    mockGetWithoutCurrentProducts.mockImplementation(() => new Promise(() => { }));

    render(<ProductDetail slug="test-slug" />);

    // ローディングアニメーションの表示を確認
    expect(screen.getByTestId("loading-animation")).toBeInTheDocument();
  });

  it("データ取得が成功した場合、ProductRecommendを表示する", async () => {
    mockGetWithoutCurrentProducts.mockResolvedValue({ products: mockProducts, error: false });

    render(<ProductDetail slug="test-slug" />);

    // ProductRecommendが表示されることを確認
    await waitFor(() => {
      expect(screen.getByTestId("product-recommend")).toBeInTheDocument();
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
  });

  it("データ取得が失敗した場合、エラーメッセージを表示する", async () => {
    mockGetWithoutCurrentProducts.mockResolvedValue({
      products: null,
      error: true,
      errorMessage: "Fetch error",
    });

    render(<ProductDetail slug="notfound" />);

    // エラーメッセージが表示されることを確認
    await waitFor(() => {
      expect(screen.getByText(/商品情報の取得に失敗しました/i)).toBeInTheDocument();
    });
  });
});
