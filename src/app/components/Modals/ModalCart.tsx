"use client"

import { getCartItemsHttp } from '@/app/http/cartItemHttp'
import { ICartItem } from '@/app/type/cartItem'
import React, { useEffect, useState } from 'react'
import { IUser } from '@/app/type/user'
import Loading from '../Loading/Loading'
import CartItemCard from '../CartItemCard'

type ModalCartProps = {
    logedUser: IUser
    closeModal: (el: boolean) => void
}

export default function ModalCart({ logedUser, closeModal }: ModalCartProps) {
    const [cartItems, setCartItems] = useState<ICartItem[]>([])
    const [isLoaded, setIsLoaded] = useState<Boolean>(false)

    useEffect(() => {
        const getCartItems = async () => {
            const cartitems: undefined | ICartItem[] = await getCartItemsHttp(logedUser.id!)
            console.log(cartitems)

            if (!cartitems) {
            console.log('cartitems: ', undefined)
            return;
            }

            setCartItems(cartitems)
            setIsLoaded(true)
        }

        console.log('cart items: ', cartItems)
        getCartItems()
    }, [cartItems.length])

    if (!isLoaded) {
        return(
            <div className='fixed inset-0 z-1 top-32 left-1/3 w-120 pl-6 pr-10 py-8 h-100 bg-[var(--darkgray)] overflow-y-auto
            lg:left-1/2 xl:top-22 xl:left-3/5 2xl:left-5/7"'
            >
                <Loading/>
            </div>
        )
    }

    if (cartItems.length === 0) {
        return(
            <div className='fixed inset-0 z-1 top-32 left-1/3 w-120 pl-6 pr-10 py-8 h-100 bg-[var(--darkgray)] overflow-y-auto
            lg:left-1/2 xl:top-22 xl:left-3/5 2xl:left-5/7"'
            >
                <p className='text-center text-2xl font-normal text-neutral-400'>No hay Productos</p>
            </div>
        )
    }

  return (
    <div className="fixed inset-0 z-1 top-32 left-1/3 w-120 pl-6 pr-10 py-8 h-100 bg-[var(--darkgray)] overflow-y-auto
    lg:left-1/2 xl:top-22 xl:left-3/5 2xl:left-5/7"
    >
        {cartItems.map((item: ICartItem) => (
            <CartItemCard key={item.id}
            closeModal={closeModal} item={item}
            cartItems={cartItems} setCartItems={setCartItems}
            />
        ))}
    </div>
  )
}
