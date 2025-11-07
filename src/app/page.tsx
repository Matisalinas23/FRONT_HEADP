"use client"

import Image from 'next/image'
import React from 'react'
import Carrousel from './components/Carrousel'
import { useRouter } from 'next/navigation'

export default function LandingPage() {  
  const navigate = useRouter()
  
  return (
    <div className='flex flex-col items-center gap-24'>
      <div className='relative'>
        <Image src="/mujer-escuchando-musica-modified.png" alt="Girl listening music" width={1920} height={720}/>
        <div className='absolute w-[55%] top-10 left-20 text-lg flex flex-col text-white duration-300
        hover:scale-103 2xl:text-5xl xl:text-4xl lg:top-20 xl:top-30 lg:text-3xl md:text-2xl'
        >
          <h2 className='flex gap-4 cursor-default'><span className='font-bold'>ESCUCHA</span> MÚSICA Y JUEGA</h2>
          <h2 className='flex gap-4 cursor-default'><span className='font-bold'>CON</span> LA MEJOR CALIDAD DE SONIDO</h2>
        </div>
      </div>
      
      <h2 className='text-5xl text-[var(--green)] cursor-default duration-200 hover:scale-103'>
        <span className='font-semibold'>Productos</span> Destacados
      </h2>

      <Carrousel />

      <h2 className='text-5xl text-[var(--green)] cursor-default duration-200 hover:scale-103'>
        <span className='font-semibold'>Tecnología</span> de cancelación de ruido
      </h2>

      <div className='relative h-160 w-full bg-[#111111]
      flex flex-col justify-center items-center gap-4 lg:flex-row'
      >
        <picture className='h-1/2 w-fit lg:h-[80%] xl:h-full'>
          <img src="/blackshark2.png" alt="blackshark v2" className='h-full'/>
        </picture>
        <div className='flex flex-col gap-2 items-center'>
          <div className='text-white gap-6 hover:scale-104 duration-300 cursor-default'>
            <h3 className='text-4xl'><span className='font-bold'>Alta</span> calidad de sonido</h3>
            <h3 className='text-4xl'><span className='font-bold'>Sin</span> ruidos externos</h3>
          </div>
          <button className='bg-linear-to-b from-[var(--darkgreen)] to-[var(--green)] font-semibold w-42 h-12 text-2xl
          hover:scale-104 duration-300 cursor-pointer' onClick={() => navigate.push("/featured_product")}
          >
            VISITAR
          </button>
        </div>
      </div>
    </div>
  );
}
