import React, { useState } from 'react'
import { IProduct } from '../type/product'
import EditIcon from '@/svg/edit-svgrepo-com.svg'
import DeleteIcon from '@/svg/delete-1487-svgrepo-com.svg'
import DetailsView from './DetailsView'
import ModalDeleteProduct from './Modals/ModalDeleteProduct'
import ModalUpdateProduct from './Modals/ModalUpdateProduct'

type ProductProps = {
    product: IProduct
    getProducts: () => void
}

export default function Product({ product, getProducts }: ProductProps) {
    const [openDetails, setOpenDetails] = useState<boolean>(false)
    const [isDeteleProduct, setIsDeleteProduct] = useState<boolean>(false)
    const [updateProduct, setUpdateProduct] = useState<boolean>(false)

    return (
        <>
            <div className="w-200 px-4 py-2 bg-[var(--darkgray)] flex">
                <div className="w-8/9 flex border-r-1 border-[var(--lightgray)] pr-4 py-1 justify-between">
                    <p className="text-lg text-[var(--green)]">{product.name}</p>

                    <div className="text-sm w-1/4 flex justify-between items-center">
                        <p>Stock: {product.stock}</p>
                        <p onClick={() => setOpenDetails(true)} className='cursor-pointer hover:font-medium'>Detalles</p>
                    </div>
                </div>

                <div className='w-1/9 flex items-center justify-end gap-3'>
                    <EditIcon className='w-8 h-8 cursor-pointer fill-[var(--darkgreen)]' onClick={() => setUpdateProduct(true)}/>
                    <DeleteIcon className='w-7 h-7 cursor-pointer fill-[var(--darkgreen)]' onClick={() => setIsDeleteProduct(true)}/>
                </div>
            </div>
            {openDetails && !isDeteleProduct &&
                <div className='fixed inset-0 h-screen w-screen bg-[var(--background)]/50 flex flex-col'>
                    <DetailsView product={product} setOpenDetails={setOpenDetails} />
                </div>
            }
            {isDeteleProduct && !openDetails &&
                <div className='fixed inset-0 h-screen w-screen bg-[var(--background)]/50 flex flex-col'>
                    <ModalDeleteProduct getProducts={getProducts} product={product} openModal={setIsDeleteProduct}/>
                </div>
            }
            {updateProduct && !isDeteleProduct && !openDetails &&
                <div className='fixed inset-0 h-screen w-screen bg-[var(--background)]/50 flex flex-col'>
                    <ModalUpdateProduct product={product} setUpdateProduct={setUpdateProduct} getProducts={getProducts}/>
                </div>
            }
        </>
    )
}
