"use client"

import Image from 'next/image'
import React from 'react'
import Carrousel from './components/Carrousel'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const buttonStyle = 'absolute top-2/5 right-50 bg-linear-to-b from-[var(--darkgreen)] to-[var(--green)] font-semibold w-42 h-12 text-2xl hover:scale-104 duration-300 cursor-pointer'
  
  const navigate = useRouter()
  
  return (
    <div className='flex flex-col items-center gap-24'>
      <div className='relative'>
        <Image src="/mujer-escuchando-musica-modified.png" alt="Girl listening music" width={1920} height={720}/>
        <div className='absolute top-30 left-20 text-5xl flex flex-col text-white hover:scale-103 duration-300'>
          <h2 className='flex gap-4 cursor-default'><span className='font-bold'>ESCUCHA</span> MUSICA Y JUEGA</h2>
          <h2 className='flex gap-4 cursor-default'><span className='font-bold'>CON</span> LA MEJOR CALIDAD DE SONIDO</h2>
        </div>
      </div>
      
      <h2 className='text-5xl text-[var(--green)] cursor-default duration-200 hover:scale-103'><span className='font-semibold'>Productos</span> Destacados</h2>

      <Carrousel />

      <h2 className='text-5xl text-[var(--green)] cursor-default duration-200 hover:scale-103'><span className='font-semibold'>Tecnología</span> de cancelación de ruido</h2>

      <div className='relative h-160 w-full' style={{background: 'linear-gradient(to right, #111111 55%, #262626)'}}>
        <Image src="/blackshark2.png" alt='auriculares blackshark' width={800} height={800} className='absolute left-50' />
        <div className='absolute w-fit right-50 top-1/4 -translate-y-1/2 text-white gap-6 hover:scale-104 duration-300 cursor-default'>
          <h3 className='text-4xl'><span className='font-bold'>Alta</span> calidad de sonido</h3>
          <h3 className='text-4xl'><span className='font-bold'>Sin</span> ruidos externos</h3>
        </div>

        <button className={buttonStyle} onClick={() => navigate.push("/featured_product")}>VISITAR</button>
      </div>
    </div>
  );
}
