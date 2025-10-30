'use client'

import productStore from '@/app/store/productStore'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ModalAddToCart from '@/app/components/Modals/ModalAddToCart'
import ModalBuyProduct from '@/app/components/Modals/ModalBuyProduct'
import { MercadoPagoWallet } from '@/app/components/MpCheckouts'
import { authStore } from '@/app/store/authStore'
import { useUser } from '@/app/hooks/useUser'
import { useParams } from 'next/navigation'

export default function BuyProduct() {
  // Local states
  const [isReceipt, setIsReceipt] = useState<boolean>(true)
  const [isModalAddToCart, setIsModalAddToCart] = useState<boolean>(false)
  const [isModalBuy, setIsModalBuy] = useState<boolean>(false)

  // global sates
  const logedUser = authStore(state => state.logedUser)
  const activeProduct = productStore(state => state.activeProduct)

  // hooks
  const { getLogedUser } = useUser()

  const countries: string[] = ['bolivia' , 'paraguay' , 'uruguay' , 'brasil' , 'chile' , 'argentina']
  const { id } = useParams()

  useEffect(() => {
    getLogedUser()

    if (!logedUser) {
      alert('Debes iniciar sesión para comprar un producto')
    }
  }, [])

  if (!activeProduct) {
    return (
      <div className='h-[80vh] flex items-center justify-center'>
        <h2 className='text-[2rem] text-neutral-500 font-semibold'>Producto no disponible...</h2>
      </div>
    )
  }

  if (logedUser && logedUser.type === "ADMIN") {
    return (
      <div className='h-[80vh] flex items-center justify-center'>
        <h1 className='text-neutral-500 text-[2.5rem] font-semibold'>No puedes acceder a esta página con una cuenta de administrador</h1>
      </div>
    )
  }

  return (
    <div className='px-90 py-16'>
      <div className='min-h-86 w-fit flex items-center gap-12'>
        <div className='min-w-130 bg-white flex justify-center items-center'>
          {activeProduct.image && <Image src={activeProduct.image.url} alt='product image' width={340} height={340} />}
        </div>

        <div className='border max-w-190 min-h-80 h-fit bg-[var(--darkgray)] py-4 px-8'>
          <h3 className='text-xl font-bold mb-10'>{activeProduct.name}</h3>

          <div className='w-full flex gap-4'>
            <div className='min-w-60'>
              <p className='w-fit text-2xl mb-4'>$ {activeProduct.price}</p>
              <p className='w-fit mb-4 text-[var(--green)] cursor-pointer duration-200 hover:underline'>Ver medios de pago</p>
              <p>Caracteristicas principales:</p>

              <div className='pl-1'>
                {activeProduct.categories.map((category) => (
                  <p key={category.id} className='text-[14px] w-fit flex items-center gap-2'><span className='w-[11px] h-[11px] bg-white rounded-full'></span>{category.name}</p>
                ))}
              </div>
            </div>

            <div className='min-w-60'>
              <div className='flex flex-col justify-between mb-4'>
                <p className='w-full flex'>Emitir recibo: <span className='ml-1'>{isReceipt ? 'Si' : 'No'}</span>
                </p>
                <p className='mb-4'>Stock disponible: {activeProduct.stock}</p>
                <p>Llega en: {logedUser && logedUser.address && countries.includes(logedUser.address!.country) ? '24-48 horas' : '48-96 horas'}</p>
              </div>
              
              <button
                disabled={ !logedUser && true}
                className='w-full h-9 mb-2 duration-200 bg-[var(--background)] cursor-pointer hover:scale-103'
                onClick={() => setIsModalAddToCart(true)}
              >
                Añadir al carrito
              </button>

              <MercadoPagoWallet product={activeProduct} logedUser={logedUser} />
            </div>
          </div>

          {isModalAddToCart &&
            <div className='fixed inset-0 h-screen w-screen bg-[var(--background)]/50 flex items-center justify-center'>
              <ModalAddToCart product={activeProduct} openModal={setIsModalAddToCart} />
            </div>
          }

          {isModalBuy &&
            <div className='fixed inset-0 h-screen w-screen bg-[var(--background)]/50 flex items-center justify-center'>
              <ModalBuyProduct openModal={setIsModalBuy} setIsReceipt={setIsReceipt} isReceipt={isReceipt} product={activeProduct}/>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
