'use client'

export const ProductDeleteButton = ({ handleDelete, productId }: any) => {

  return (
    <div onClick={() => handleDelete(productId)} className='text-accent'>
      削除する
    </div>
  )
}
