import { render, screen, waitFor } from "@testing-library/react";
import ProductIndex from "@/app/_components/_product/ProductIndex";
import { vi, describe, it, expect } from "vitest";

// モックデータ
const mockProducts = [
  { id: 1, name: "Product 1", price: 1000, description: "Description 1", slug: "product-1", images: [] },
  { id: 2, name: "Product 2", price: 2000, description: "Description 2", slug: "product-2", images: [] },
];

// モック関数
const mockGetAllProducts = vi.hoisted(() => vi.fn(async () => mockProducts));

vi.mock("@/app/console/products/GetAllProducts", async () => ({
  GetAllProducts: mockGetAllProducts,
}));

vi.mock("@/app/_components/LoadingAnimation", () => ({
  default: () => <div data-testid="loading-animation">Loading...</div>,
}));

vi.mock("@/app/_components/ProductsArea", () => ({
  default: ({ products }: { products: typeof mockProducts }) => (
    <div data-testid="product-area">
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  ),
}));

describe("ProductIndex", () => {
  it("ローディング中にローディングアニメーションを表示する", async () => {
    mockGetAllProducts.mockImplementation(() => new Promise(() => { })); // 永遠に解決しないPromise

    render(<ProductIndex />);

    expect(screen.getByTestId("loading-animation")).toBeInTheDocument();
  });

  it("データ取得が成功した場合、ProductsAreaを表示する", async () => {
    mockGetAllProducts.mockResolvedValue(mockProducts);

    render(<ProductIndex />);

    await waitFor(() => {
      expect(screen.getByTestId("product-area")).toBeInTheDocument();
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
  });
});
