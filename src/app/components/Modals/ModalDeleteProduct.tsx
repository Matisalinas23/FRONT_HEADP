import React, { ChangeEvent, useState } from 'react'
import { deleteProductHttp } from '../../http/productsHttp'
import { IProduct } from '../../type/product'
import CancelButton from '../CancelButton'

type ModalDeleteProductProps = {
    getProducts: () => void
    product: IProduct
    openModal: (el: boolean) => void
}

export default function ModalDeleteProduct({ getProducts, product, openModal }: ModalDeleteProductProps) {
    const [isEnabled, setIsEnabled] = useState<boolean>(true)
    const [confirmWord, setConfirmWord] = useState<string>("")

    const handleDeleteProduct = async() => {
        console.log("Eliminado...")
        
        try {
            await deleteProductHttp(product.id)
            getProducts()
            openModal(false)
        } catch (error) {
            alert("Ha ocurrido un error al intentar eliminar el producto, inténtalo mas tarder")
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setConfirmWord(value)

        setIsEnabled(value === "ELIMINAR PRODUCTO")
    }

  return (
    <div className='absolute top-30 left-1/2 -translate-x-1/2 bg-[var(--darkgray)] w-140 px-12 py-6 flex flex-col items-center'>
      <p className='m-4'>
        Escribe <b>ELIMINAR PRODUCTO</b> abajo para confirmar que quieres eliminar el producto: {product.name}
      </p>
      
      <input type="text" name='confirmWord' value={confirmWord} onChange={handleChange}
      className='w-full mt-2 py-1 px-2 bg-[var(--lightgray)] mb-4'/>
      <div className='w-full flex justify-between'>
        <CancelButton openModal={openModal} />
        <button disabled={!isEnabled}
        className={isEnabled ? 'bg-[var(--red)] w-28 font-normal cursor-pointer' : 'bg-red-900 text-gray-300 w-28 font-normal'}
        onClick={handleDeleteProduct}>
            Eliminar
        </button>
      </div>
    </div>
  )
}
