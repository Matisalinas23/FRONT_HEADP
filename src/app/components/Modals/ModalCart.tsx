"use client"

import { getCartItemsHttp } from '@/app/http/cartItemHttp'
import { ICartItem } from '@/app/type/cartItem'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IUser } from '@/app/type/user'
import Loading from '../Loading/Loading'

type ModalCartProps = {
    logedUser: IUser
    closeModal: (el: boolean) => void
}

export default function ModalCart({ logedUser, closeModal }: ModalCartProps) {
    const [cartItems, setCartItems] = useState<ICartItem[]>([])

    const navigate = useRouter()

    useEffect(() => {
        const getCartItems = async () => {
            const cartitems: undefined | ICartItem[] = await getCartItemsHttp(logedUser.id!)
            console.log(cartitems)

            if (!cartitems) {
            console.log('cartitems: ', undefined)
            return;
            }

            setCartItems(cartitems)
        }

        console.log('cart items: ', cartItems)
        getCartItems()
    }, [])

    if (cartItems.length === 0) {
        return(
            <div className='fixed inset-0 z-1 top-22 left-3/4 w-110 pl-6 pr-10 py-8 h-100 bg-[var(--darkgray)]'>
                <Loading/>
            </div>
        )
    }

  return (
    <div className="fixed inset-0 z-1 top-22 left-3/4 w-110 pl-6 pr-10 py-8 h-100 bg-[var(--darkgray)] overflow-y-auto">
        {cartItems.map((item) => (
            <div key={item.id}
                className='h-16 mb-4 bg-[var(--background)] flex items-center rounded-r-[18px] cursor-pointer'
                onClick={() => { navigate.push(`/product_page/${item.productId}`); closeModal(false)} }
            >
                <div className='flex w-3/4'>
                    <div className=' w-20 h-16 bg-white'>
                        {item.product.image && <Image src={item.product.image.url} alt='product image' width={100} height={100}/>}
                    </div>
                    <p className='font-normal text-[17px] overflow-hidden w-70 mx-3 flex items-center'>{item.product.name}</p>
                </div>
                <div className='border-l-1 h-5/6 flex flex-col w-1/4 pl-3 justify-center gap-1'>
                    <p>x {item.product.quantity}</p>
                    <p>$ {item.product.price}</p>
                </div>
            </div>
        ))}
    </div>
  )
}
