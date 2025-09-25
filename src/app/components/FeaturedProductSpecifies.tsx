import Image from 'next/image'
import React from 'react'

export default function FeaturedProductSpecifies() {
    return (
        <div className='relative h-screen w-full flex items-center justify-center'>
            <p className='absolute left-3/5 top-1/6 text-lg text-[var(--green)] duration-100 cursor-default hover:scale-103'>
                <span className='font-semibold'>Diadema</span> flexible, acolchada y aterciopelada
            </p>

            <p className='absolute left-1/5 top-1/2 text-lg text-[var(--green)] duration-100 cursor-default hover:scale-103'>
                <span className='font-semibold'>Tensores</span> laterales para mejorar el agarre
            </p>

            <p className='absolute left-3/5 top-2/5 text-lg text-[var(--green)] duration-100 cursor-default hover:scale-103'>
                <span className='font-semibold'>Orejeras</span> acolchadas y aterciopeladas
            </p>

            <div className='absolute left-1/6 top-3/4 text-lg text-[var(--green)] duration-100 cursor-default hover:scale-103'>
                <span className='font-semibold'>Microfono</span> Flexible con protector externo
                <p>de alta durabilidad y filtro anti pop</p>
            </div>
            <Image src="/blackshark4.png" alt="product image" width={700} height={700} />
        </div>
    )
}
