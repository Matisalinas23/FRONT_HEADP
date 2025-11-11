import React from 'react'

export default function FeaturedProductSpecifies() {
    return (
        <div className='relative h-160 w-full xl:h-screen flex items-center justify-center border'>
            <p className='absolute left-6/10 top-2/10 text-lg text-[var(--green)] duration-100 cursor-default
            lg:left-5/9 xl:top-3/10 hover:scale-103'>
                <span className='font-semibold'>Diadema</span> flexible, acolchada y aterciopelada
            </p>

            <p className='absolute left-1/10 w-56 top-4/9 text-lg text-[var(--green)] duration-100 cursor-default
            md:left-2/10 lg:left-3/12 xl:left-3/10 hover:scale-103'>
                <span className='font-semibold'>Tensores</span> laterales para mejorar el agarre
            </p>

            <p className='absolute w-52 right-1/16 top-5/10 text-lg text-[var(--green)] duration-100 cursor-default
            md:right-1/10 lg:right-2/10 xl:right-2/10 hover:scale-103'>
                <span className='font-semibold'>Orejeras</span> acolchadas y aterciopeladas
            </p>

            <div className='absolute w-72 left-1/6 top-10/12 text-lg text-[var(--green)] duration-100 cursor-default
            xl:top-3/4 xl:left-1/3 xl:w-fit hover:scale-103'>
                <span className='font-semibold'>Microfono</span> Flexible con protector externo
                <p>de alta durabilidad y filtro anti pop</p>
            </div>
            <picture>
                <img src="/blackshark4.png" alt="product image" />
            </picture>
        </div>
    )
}
