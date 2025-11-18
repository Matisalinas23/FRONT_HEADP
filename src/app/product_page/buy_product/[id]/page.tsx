'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ModalAddToCart from '@/app/components/Modals/ModalAddToCart'
import { MercadoPagoWallet } from '@/app/components/MpCheckouts'
import { authStore } from '@/app/store/authStore'
import { useUser } from '@/app/hooks/useUser'
import { useParams } from 'next/navigation'
import { getProductByIdHttp } from '@/app/http/productsHttp'
import { IProduct } from '@/app/type/product'
import Loading from '@/app/components/Loading/Loading'

export default function BuyProduct() {
  // Local states
  const [isModalAddToCart, setIsModalAddToCart] = useState<boolean>(false)
  const [product, setProduct] = useState<IProduct | undefined>(undefined)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  // global sates
  const logedUser = authStore(state => state.logedUser)

  // hooks
  const { getLogedUser } = useUser()

  const countries: string[] = ['bolivia' , 'paraguay' , 'uruguay' , 'brasil' , 'chile' , 'argentina']
  const { id } = useParams()
  

  useEffect(() => {
    const getProductById = async (id: string) => {
      const thisProduct = await getProductByIdHttp(id)
      setProduct(thisProduct)
      setIsLoaded(true)
    }

    getLogedUser()
    getProductById(String(id))
  }, [])

  if (!logedUser) {
    return (
      <div className='h-[80vh] flex items-center justify-center'>
        <h1 className='text-neutral-500 text-[2.5rem] font-semibold'>No puedes acceder a esta página si no estas logeado</h1>
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
  
  if (!isLoaded) {
    return (
      <Loading/>
    )
  }

  if (!product) {
    return (
      <div className='h-120 flex justify-center items-center'>
        <h1 className='text-4xl text-neutral-600 font-semibold'>Producto no disponible...</h1>
      </div>
    )
  }

  return (
    <div className='px-30 py-16 xl:px-60 2xl:px-90'>
      <div className=' min-h-86 mb-6 flex flex-col items-center justify-center gap-12 lg:flex-row 2xl:gap-24'> 
        <picture className='min-w-60 h-full bg-neutral-300 flex justify-center items-center'>
          {product.image && <Image src={product.image.url} alt='product image' width={340} height={340} />}
        </picture>

        <div className='border max-w-190 min-h-80 h-fit bg-[var(--darkgray)] py-4 px-8'>
          <h3 className='text-xl font-bold mb-10'>{product.name}</h3>

          <div className='w-full flex gap-4'>
            <div className='min-w-60'>
              <p className='w-fit text-2xl mb-4'>$ {product.price}</p>
              <div className='flex flex-col'>
                  Medios de pago disponibles:
                  <p className='ml-2 mb-2 text-[var(--green)]'>
                    <span>Mercado Pago</span>
                  </p>
                </div>
              <p>Caracteristicas principales:</p>

              <div className='pl-1'>
                {product.categories.map((category) => (
                  <p key={category.id} className='text-[12px] w-fit flex items-center gap-2'><span className='w-[9px] h-[9px] bg-white rounded-full'></span>{category.name}</p>
                ))}
              </div>
            </div>

            <div className=''>
              <div className='flex flex-col justify-between mb-4'>
                <p className='mb-4'>Stock disponible: {product.stock}</p>
                <p>Llega en: {logedUser && logedUser.address && countries.includes(logedUser.address!.country) ? '24-48 horas' : '48-96 horas'}</p>
              </div>
              
              <button
                disabled={ !logedUser && true}
                className='w-full h-9 mb-2  duration-200 bg-[var(--background)] cursor-pointer hover:scale-103'
                onClick={() => setIsModalAddToCart(true)}
              >
                Añadir al carrito
              </button>

              <MercadoPagoWallet product={product} logedUser={logedUser} />
            </div>
          </div>

          {isModalAddToCart &&
            <div className='fixed inset-0 h-screen w-screen bg-[var(--background)]/50 flex items-center justify-center'>
              <ModalAddToCart product={product} openModal={setIsModalAddToCart} />
            </div>
          }
        </div>
      </div>

      <div className="w-full py-4 border-t-1 border-neutral-500">
          <div className='bg-[var(--darkgray)] rounded-xl p-4 flex flex-col gap-y-4'>
            <h3 className='text-lg'>Descripcion:</h3>
            <p className='max-h-100 overflow-y-auto text-neutral-400 whitespace-pre-line'>
              {product && product.description}
            </p>
          </div>
      </div>

    </div>
  )
}
