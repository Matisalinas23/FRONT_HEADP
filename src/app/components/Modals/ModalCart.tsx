import { getCartItemsHttp } from '@/app/http/cartItemHttp'
import { ICartItem } from '@/app/type/cartItem'
import { IUser } from '@/app/type/user'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type ModalCartProps = {
    logedUser: IUser
}

export default function ModalCart({ logedUser }: ModalCartProps) {
    const [cartItems, setCartItems] = useState<ICartItem[]>([])

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

  return (
    <div className="fixed inset-0 z-1 top-22 left-3/4 w-110 pl-6 pr-10 py-8 h-100 bg-[var(--darkgray)] overflow-y-auto">
        {cartItems.map((item) => (
            <div key={item.id} className='h-16 mb-4 bg-[var(--background)] flex items-center rounded-r-[18px]'>
                <div className='flex w-3/4'>
                    <div className=' w-20 h-16 bg-white'>
                        <Image src={item.product.image.url} alt='product image' width={100} height={100}/>
                    </div>
                    <p key={item.id!} className='font-normal text-[17px] overflow-hidden w-70 mx-3 flex items-center'>{item.product.name}</p>
                </div>
                <div className='border-l-1 h-5/6 flex flex-col w-1/4 pl-3 justify-center gap-1'>
                    <p key={item.id!}>x {item.product.quantity}</p>
                    <p key={item.id!}>$ {item.product.price}</p>
                </div>
            </div>
        ))}
    </div>
  )
}
