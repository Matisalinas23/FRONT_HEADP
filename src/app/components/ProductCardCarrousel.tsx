import React from 'react'
import { IProduct } from '../type/product'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Props = {
    product: IProduct
}

export default function ProductCardCarrousel({ product }: Props) {
  const navigate = useRouter()

  const handleGoToProduct = () => {
    navigate.push(`/product_page/${product.id}`)
  }

  return (
    <div className='w-60 duration-300 cursor-pointer hover:scale-103' onClick={handleGoToProduct}>
      <div className='flex h-60 bg-white items-center justify-center'>
        <Image src={product.image.url} alt='card carrousel image' width={320} height={320} />
      </div>
      <div className='h-40 w-full bg-[var(--gray)] rounded-b-4xl px-2 py-1'>
        <p className='overflow-y-hidden h-15 py-2 mb-2 font-semibold'>{product.name}</p>
        <div className='h-0 w-full mt-1 border-1 border-[var(--lightgray)]'></div>
        <p className='font-normal h-10 flex items-center pl-2'>${product.price}</p>
        <div className='h-0 w-full border-1 border-[var(--lightgray)]'></div>
        <p className='font-normal flex items-center h-8 pl-2'>Stock {product.stock}</p>
      </div>
    </div>
  )
}
