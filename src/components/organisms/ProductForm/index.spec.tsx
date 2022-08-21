import {
  render,
  act,
  screen,
  fireEvent,
  RenderResult,
} from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import ProductForm from '.'
import { theme } from 'themes'

describe('ProductForm', () => {
  let renderResult: RenderResult
  let handleProductSave: jest.Mock
  // スタブ
  global.URL.createObjectURL = () => 'https://test.com'

  beforeEach(() => {
    // ダミー関数
    handleProductSave = jest.fn()
    renderResult = render(
      <ThemeProvider theme={theme}>
        <ProductForm onProductSave={handleProductSave} />
      </ThemeProvider>,
    )
  })

  afterEach(() => {
    renderResult.unmount()
  })

  it('フォーム入力後onProductSaveが呼ばれる', async () => {
    await act(async () => {
      const element = await screen.findByTestId('dropzone')
      fireEvent.drop(element, {
        dataTransfer: {
          files: [
            new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
          ],
        },
      })

      const inputProductTitleNode = screen.getByPlaceholderText(
        /商品のタイトル/,
      ) as HTMLInputElement
      fireEvent.change(inputProductTitleNode, { target: { value: '商品' } })

      const inputProductInfoNode = screen.getByPlaceholderText(
        /最高の商品です/,
      ) as HTMLInputElement
      fireEvent.change(inputProductInfoNode, {
        target: { value: 'テストテスト' },
      })

      const inputPriceNode = screen.getByPlaceholderText(
        /100/,
      ) as HTMLInputElement
      fireEvent.change(inputPriceNode, { target: { value: '100' } })

      fireEvent.click(screen.getByText('出品'))
    })

    expect(handleProductSave).toHaveBeenCalledTimes(1)
  })

  it('商品タイトル入力だけでは、バリデーションエラーでonProductSaveが呼ばれない', async () => {
    await act(async () => {
      const inputProductTitleNode = screen.getByPlaceholderText(
        /商品のタイトル/,
      ) as HTMLInputElement
      fireEvent.change(inputProductTitleNode, { target: { value: '商品' } })

      fireEvent.click(screen.getByText('出品'))
    })

    // handleProductSaveが呼ばれていないことを確認
    expect(handleProductSave).toHaveBeenCalledTimes(0)
  })
})
