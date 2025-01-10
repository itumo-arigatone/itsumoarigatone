import { render, screen } from "@testing-library/react";
import { generateMetadata } from "@/app/product/[slug]/page";
import Page from "@/app/product/[slug]/page";
import { getProduct } from "@/lib/product/getProduct";
import { vi, describe, it, expect } from "vitest";

const mockProductInfo = {
  product: {
    id: "123",
    name: "テスト製品",
    price: 5000,
    description: "これはテスト用の製品です。",
    images: [{ key: "image_key_1" }],
    baseLink: "https://example.com",
  },
};

vi.mock("next/navigation", async () => ({
  notFound: vi.fn(),
}));

vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    cache: (fn: any) => fn,
  };
});

// モックの設定
const mockProduct = vi.hoisted(() => (
  vi.fn(async () => mockProductInfo)
));

vi.mock('@/lib/product/getProduct', async () => ({
  getProduct: mockProduct
}))

describe("Page", () => {
  it("製品情報が正しくレンダリングされる", async () => {
    const params = { slug: "test-product" };
    render(await Page({ params }));

    // 製品名
    expect(screen.getByText(mockProductInfo.product.name).innerHTML).toEqual(mockProductInfo.product.name);

    // 価格
    expect(
      screen.getByText(`￥${mockProductInfo.product.price}`).innerHTML
    ).toEqual(`￥${mockProductInfo.product.price}`);

    // 説明文
    expect(
      screen.getByText(mockProductInfo.product.description).innerHTML
    ).toEqual(mockProductInfo.product.description);
  });

  it("製品が存在しない場合にnotFoundが呼び出される", async () => {
    mockProduct.mockResolvedValue({
      product: null,
    });

    const { notFound } = await import("next/navigation");
    const params = { slug: "unknown-product" };

    // 非同期処理を解決してから `render` を呼び出す
    const pageComponent = await Page({ params });
    render(pageComponent);

    expect(notFound).toHaveBeenCalled();
  });
});