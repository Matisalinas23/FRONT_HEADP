'use client'

import { useProducts } from '@/app/hooks/useProducts'
import productStore from '@/app/store/productStore'
import Image from 'next/image'
import React, { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ModalAddToCart from '@/app/components/Modals/ModalAddToCart'
import { authStore } from '@/app/store/authStore'
import ModalBuyProduct from '@/app/components/Modals/ModalBuyProduct'
import { MercadoPagoWallet } from '@/app/components/MpCheckouts'

export default function BuyProduct({ params }: { params: Promise<{ id: string }> }) {

  const { id } = use(params)
  console.log('params: ', params)

  // Local states
  
  const [loading, setLoading] = useState<boolean>(true)
  const [isReceipt, setIsReceipt] = useState<boolean>(true)
  const [isModalAddToCart, setIsModalAddToCart] = useState<boolean>(false)
  const [isModalBuy, setIsModalBuy] = useState<boolean>(false)

  // global sates stores
  const logedUser = authStore(state => state.logedUser)
  const product = productStore(state => state.product)

  // hooks
  const { getProductById } = useProducts()
  const navigate = useRouter()

  const countries: string[] = ['bolivia' , 'paraguay' , 'uruguay' , 'brasil' , 'chile' , 'argentina']
  

  useEffect(() => {
    const fetchProduct = async () => {
      console.log('params: ', params)
      await getProductById(id)
      setLoading(false) // take off the load message
    }

    fetchProduct()
  }, [])

  if (loading) {
    return (
      <p>Carcando producto...</p>
    )
  }

  if (!product) {
    navigate.push('/product_page')
    return null
  }

  return (
    <div className='px-90 py-16'>
      <div className='min-h-86 w-fit flex items-center gap-12'>
        <div className='min-w-130 bg-white flex justify-center items-center'>
          {product.image && <Image src={product.image.url} alt='product image' width={340} height={340} />}
        </div>

        <div className='border max-w-190 min-h-80 h-fit bg-[var(--darkgray)] py-4 px-8'>
          <h3 className='text-xl font-bold mb-10'>{product.name}</h3>

          <div className='w-full flex gap-4'>
            <div className='min-w-60'>
              <p className='w-fit text-2xl mb-4'>$ {product.price}</p>
              <p className='w-fit mb-4 text-[var(--green)] cursor-pointer duration-200 hover:underline'>Ver medios de pago</p>
              <p>Caracteristicas principales:</p>

              <div className='pl-1'>
                {product?.categories.map((category) => (
                  <p key={category.id} className='text-[14px] w-fit flex items-center gap-2'><span className='w-[11px] h-[11px] bg-white rounded-full'></span>{category.name}</p>
                ))}
              </div>
            </div>

            <div className='min-w-60'>
              <div className='flex flex-col justify-between mb-4'>
                <p className='w-full flex'>Emitir recibo: <span className='ml-1'>{isReceipt ? 'Si' : 'No'}</span>
                </p>
                <p className='mb-4'>Stock disponible: {product.stock}</p>
                <p>Llega en: {logedUser && logedUser.address && countries.includes(logedUser.address!.country) ? '24-48 horas' : '48-96 horas'}</p>
              </div>
              
              <button
                className='w-full h-9 mb-2 duration-200 bg-[var(--background)] cursor-pointer hover:scale-103'
                onClick={() => setIsModalAddToCart(true)}
              >
                Añadir al carrito
              </button>

              <MercadoPagoWallet product={product} />
            </div>
          </div>

          {isModalAddToCart &&
            <div className='fixed inset-0 h-screen w-screen bg-[var(--background)]/50 flex items-center justify-center'>
              <ModalAddToCart product={product} openModal={setIsModalAddToCart} />
            </div>
          }

          {isModalBuy &&
            <div className='fixed inset-0 h-screen w-screen bg-[var(--background)]/50 flex items-center justify-center'>
              <ModalBuyProduct openModal={setIsModalBuy} setIsReceipt={setIsReceipt} isReceipt={isReceipt} product={product}/>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
