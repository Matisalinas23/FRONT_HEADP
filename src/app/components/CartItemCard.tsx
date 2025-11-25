import DeleteIcon from '@/svg/delete-1487-svgrepo-com.svg'
import { ICartItem } from '../type/cartItem';
import { useRouter } from 'next/navigation';
import { deleteCartItemHttp } from '../http/cartItemHttp';
import Image from 'next/image';

type CartItemsCardProps = {
    closeModal: (el: boolean) => void
    item: ICartItem
    setCartItems: (el: ICartItem[]) => void
    cartItems: ICartItem[]
}

export default function CartItemCard({ closeModal, item, setCartItems, cartItems }: CartItemsCardProps) {
    const navigate = useRouter()

    const handleDeleteItem = (item: ICartItem) => {
        deleteCartItemHttp(item.id!);
        const newCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
        setCartItems(newCartItems);
    }

    return (
      <div key={item.id} className='h-16 bg-[var(--background)] rounded-r-[18px] mb-4 flex items-center justify-between'>
          <div onClick={() => { navigate.push(`/product_page/buy_product/${item.productId!}`); closeModal(false) }}
              className='cursor-pointer h-full flex items-center justify-between gap-2'
          >
              <div className='h-16 w-16 mr-2 bg-white flex items-center justify-center'>
                  {item.product.image && <Image src={item.product.image.url} alt='product image' width={60} height={60} />}
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
              onClick={() => handleDeleteItem(item)}
          >
              <DeleteIcon className='w-6 h-6 fill-white hover:fill-red-700' />
          </button>
      </div>
  )
}
