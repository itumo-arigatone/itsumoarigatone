import { vi, expect, test, describe } from 'vitest'
import { getAllProducts } from '@/lib/product/getAllProducts'

describe('getAllProducts', () => {
  test("Normal: Returns the correct value", async () => {
    const result = await getAllProducts();
    // expect(result).toEqual({ sampleAction: "sampleAction" });
  });
})