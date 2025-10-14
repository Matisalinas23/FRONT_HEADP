"use client"

import React from 'react'
import Image from 'next/image'
import FeaturedProductsBanner from '../components/FeaturedProductsBanner'
import FeaturedProductSpecifies from '../components/FeaturedProductSpecifies'
import { useRouter } from 'next/navigation'

export default function FeaturedProduct() {
  const buttonStyle = 'border-2 w-100 h-14 text-[var(--darkgreen)] cursor-pointer ease-in-out duration-300 hover:scale-103 hover:bg-[var(--darkgreen)] hover:text-white hover:border-none hover:font-normal'

  const navigate = useRouter();

  return (
    <div className=''>
        <FeaturedProductsBanner />

        <div className='h-60 w-full bg-gradient-to-b from-[#111111] to-[var(--background)]'></div>

        <FeaturedProductSpecifies/>

        <div className='h-60 w-full bg-gradient-to-b from-[ver(--darkgray)] to-[#232323]'></div>

        <div className="h-200 bg-[#232323] flex items-start justify around px-16">
          <Image src="/hombre-alegre-ponerse-auriculares.jpg" alt='hombre alegre' width={1000} height={200}/>

          <div className='text-2xl text-[var(--green)] ml-12 mt-30'>
            <h2 className='text-4xl mb-6 text-[var(--darkgreen)]'><span className='font-bold'>Cambia</span> de modo transapencia a opacidad</h2>
            <p className='mb-1'>El modo tranparencia deja pasar el ruido de tu alrededor</p>
            <p className='mb-6'>para no perder la conexion con tu entorno</p>
            <p className='mb-1'>El modo opacidad activa nuevamente la cancelacion de ruido</p>
          </div>
        </div>

        <div className='h-60 w-full bg-gradient-to-b from-[#232323] to-[#313131]'></div>

        <div className='h-140 w-full bg-[#313131] flex flex-col items-center pt-16'>
          <button className={`${buttonStyle} mb-12`} onClick={() => navigate.push('/product_page/4')}><h2 className='text-2xl'>Ir al Producto</h2></button>
          <button className={buttonStyle} onClick={() => navigate.push('/product_page')}><h2 className='text-2xl'>Otros Productos</h2></button>
        </div>
    </div>
  )
}
