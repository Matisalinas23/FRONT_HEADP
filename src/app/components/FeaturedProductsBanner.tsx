import Image from 'next/image'
import React from 'react'

export default function FeaturedProductsBanner() {
    return (
            <div className='relative h-120 w-full bg-[#111111] flex justify-center'>
                <div className='flex items-center'>
                    <Image
                        src="/blackshark2.png" alt="product image" width={600} height={600}
                        className='hover:scale-102 duration-200 mr-4'
                    />

                    <div className='h-fit hover:scale-102 duration-200 cursor-default ml-4'>
                        <h3 className='text-4xl text-[var(--darkgreen)] mb-3'>
                            <span className='font-semibold'>ANC</span> Active Noise Cancelling
                        </h3>
                        <p className='text-2xl text-[var(--green)] mb-1'>HeadP ofrece la última tecnologia</p>
                        <p className='text-2xl text-[var(--green)]'>en cancelacion de ruido</p>
                        <p className='text-2xl text-[var(--green)]'>y materiales de alta calidad</p>
                    </div>
                </div>
            </div>
    )
}
