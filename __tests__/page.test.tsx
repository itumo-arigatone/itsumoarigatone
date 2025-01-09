import { vi, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '@/app/page'

test('Page', () => {
  vi.mock("react", async () => {
    const actual = await vi.importActual("react");
    return {
      ...actual,
      cache: (fn: any) => fn,
    };
  });

  render(<Page />)
  expect(screen.getByRole('heading', { level: 1, name: 'Itsumoarigatone' })).toBeDefined()
})