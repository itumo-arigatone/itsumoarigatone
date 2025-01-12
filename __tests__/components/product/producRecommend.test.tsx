import { render, screen } from "@testing-library/react";
import ProductRecommend from "@/app/_components/_product/ProductRecommend";
import { vi, describe, it, expect } from "vitest";

// モックデータ
const mockProducts = [
  {
    id: 1,
    name: "Product 1",
    price: 1000,
    images: [],
    slug: "product-1",
  },
  {
    id: 2,
    name: "Product 2",
    price: 2000,
    images: [],
    slug: "product-2",
  },
];

vi.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="swiper">{children}</div>
  ),
  SwiperSlide: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="swiper-slide">{children}</div>
  ),
}));

vi.mock('@/app/_components/Product', () => ({
  default: ({ title }: { title: string }) => <div>{title}</div>,
}));

describe("ProductRecommend", () => {
  it("Swiperが正しくレンダリングされる", () => {
    render(<ProductRecommend products={mockProducts} />);

    // Swiperコンポーネントが表示されることを確認
    expect(screen.getByTestId("swiper")).toBeInTheDocument();

    // 正しい数のSwiperSlideが表示されることを確認
    const slides = screen.getAllByTestId("swiper-slide");
    expect(slides).toHaveLength(mockProducts.length);
  });

  it("製品データが正しく表示される", () => {
    // render(<ProductRecommend products={mockProducts} />);

    // 各製品の名前が正しく表示されることを確認
    mockProducts.forEach((product) => {
      const elements = screen.getAllByText(product.name);
      expect(elements).toHaveLength(1);
    });
  });
});
