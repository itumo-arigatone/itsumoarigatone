'use client'

export const ProductDeleteButton = ({ handleDelete, productId }: any) => {

  const handleClick = () => {
    const confirmed = window.confirm('削除してもよろしいですか？');
    if (confirmed) {
      handleDelete(productId)
    }
  }

  return (
    <div onClick={() => handleClick()} className='text-accent'>
      削除する
    </div>
  )
}
