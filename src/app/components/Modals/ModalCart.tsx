"use client"

import { deleteCartItemHttp, getCartItemsHttp } from '@/app/http/cartItemHttp'
import { ICartItem } from '@/app/type/cartItem'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IUser } from '@/app/type/user'
import Loading from '../Loading/Loading'
import DeleteIcon from '@/svg/delete-1487-svgrepo-com.svg'

type ModalCartProps = {
    logedUser: IUser
    closeModal: (el: boolean) => void
}

export default function ModalCart({ logedUser, closeModal }: ModalCartProps) {
    const [cartItems, setCartItems] = useState<ICartItem[]>([])
    const [isLoaded, setIsLoaded] = useState<Boolean>(false)

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
            setIsLoaded(true)
        }

        console.log('cart items: ', cartItems)
        getCartItems()
    }, [])

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
        {cartItems.map((item) => (
            <div key={item.id} className='h-16 bg-[var(--background)] rounded-r-[18px] mb-4 flex items-center justify-between'>
                <div onClick={() => { navigate.push(`/product_page/buy_product/${item.productId}`); closeModal(false)}}
                className='cursor-pointer h-full flex items-center justify-between gap-2'
                >
                    <div className='h-16 w-16 mr-2 bg-white flex items-center justify-center'>
                    {item.product.image && <Image src={item.product.image.url} alt='product image' width={60} height={60}/>}
                    </div>

                    <div className='w-52 h-full bg-gray flex items-center'>
                        <p className='text-[16px] font-medium h-13 overflow-hidden'>{item.product.name}</p>
                    </div>

                    <div className='h-5/6 ml-4 flex flex-col w-1/4 justify-center gap-1'>
                        <p>x {item.product.quantity}</p>
                        <p>$ {item.product.price}</p>
                    </div>
                </div>

                <button className='h-5/6 flex px-3 items-center border-l-1'
                onClick={() => { item.id ? deleteCartItemHttp(item.id) : console.log("problem with item id") }}
                >
                    <DeleteIcon className='w-6 h-6 fill-white hover:fill-red-700' />
                </button>
            </div>
        ))}
    </div>
  )
}
