import React from 'react'
import { IProduct } from '../type/product'
import Image from 'next/image'

type DetailsViewProps = {
    product: IProduct
    setOpenDetails: (el: boolean) => void
}

export default function DetailsView({ product, setOpenDetails }: DetailsViewProps) {
  return (
    <div className='absolute top-25 left-1/2 -translate-x-1/2 bg-[var(--darkgray)] w-160 h-132 px-20 pt-22 pb-10'>
            <h3 className='absolute top-6 w-120 flex justify-center text-xl mb-4 text-[var(--green)]'>{product.name}</h3>
            <div className='w-full h-full flex flex-col items-center'>

                <div className='h-30 flex items-center gap-8 mb-4'>
                    <Image src={product.image.url} alt='productImage' height={120} width={120} />
                    <p className='max-h-full pr-4 overflow-y-auto'>{product.description}</p>
                </div>

                <h3 className='mb-2'>Categorías</h3>
                <div className='border-2 border-[var(--gray)] h-30 w-full grid grid-rows-3 grid-cols-3 gap-2 mb-4'>
                    {product.categories.map((c) => (<p key={c.id} className='min-w-36 pt-1 text-sm text-center border-neutral-500'>{c.name}</p>))}
                </div>

                <b>Precio: ${product.price}</b>

                <button className='absolute bottom-12 bg-[var(--darkgreen)] h-8 px-8 font-normal text-lg'
                    onClick={() => setOpenDetails(false)}>
                    Cerrar
                </button>
            </div>
        </div>
    )
}
