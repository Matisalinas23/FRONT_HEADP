import React, { ChangeEvent, useEffect, useState } from 'react'
import CancelButton from '../CancelButton'
import AcceptButton from '../AcceptButton'
import SwitchIcon from '../SwitchIcon'
import { authStore } from '@/app/store/authStore'
import { useFormik } from 'formik'
import { IProduct } from '@/app/type/product'
import { FaPlus, FaMinus } from 'react-icons/fa'
type ModalBuyProductProps = {
    openModal: (boolean: boolean) => void
    setIsReceipt: (boolean: boolean) => void
    isReceipt: boolean
    product: IProduct
}

export default function ModalBuyProduct({ openModal, setIsReceipt, isReceipt, product }: ModalBuyProductProps) {
    const [selectState, setSelectState] = useState<'Mercado Pago' | ''>('')
    const [quantity, setQuantity] = useState<number>(0)

    const logedUser = authStore(state => state.logedUser)

    const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectState(e.target.value as 'Mercado Pago' | '')
    }

    const formik = useFormik({
        initialValues: {
            particularAddress: logedUser ? logedUser.address!.particularAddress : '',
            city: logedUser ? logedUser.address!.city : '',
            province: logedUser ? logedUser.address!.province : '',
            country: logedUser ? logedUser.address!.country : '',
        },
        onSubmit: async () => {

        }
    })

    return (
        <div className='w-200 border bg-[var(--darkgray)] px-10 py-8 min-h-100 flex flex-col'>
            <h3 className='w-full text-center font-semibold text-[24px] mb-6'>Configuracion de tu compra</h3>
            <div className='flex gap-8'>
                <div className='w-1/2'>
                    <label className='flex flex-col mb-6 text-[19px] gap-1'>Medio de pago:
                        <select className='bg-[var(--background)] h-8' value={selectState} onChange={handleChangeSelect}>
                            <option></option>
                            <option onClick={() => setSelectState('Mercado Pago')}>Mercado Pago</option>
                        </select>
                    </label>

                    {selectState === 'Mercado Pago' && <h3 className='text-[19px] mb-2'>Direccion:</h3>}
                    {selectState === 'Mercado Pago' && logedUser &&
                        Object.entries(formik.values).map(([key, value]) => (
                            <input key={key} name={key} value={value as string} onChange={formik.handleChange}
                                onBlur={formik.handleBlur} className='h-7 w-full bg-[var(--background)] mb-4 px-2'
                            />
                        ))}
                    <h3 className='text-[19px] mb-2 flex itemx-center gap-40'>Cantidad: {quantity}
                        <div className='flex items-center gap-10'>
                            <button className='cursor-pointer' onClick={() => { if (quantity>0) setQuantity(quantity - 1) }}><FaMinus/></button>
                            <button className='cursor-pointer' onClick={() => setQuantity(quantity + 1)}><FaPlus/></button>
                        </div>
                    </h3>
                </div>

                <div className='w-1/2'>    
                    <h3 className='text-[19px]'>Detalles del producto:</h3>
                    <p>Nombre: {product.name}</p>
                    <p>Cantidad: {quantity}</p>
                    <label className='flex text-[19px] justify-between mb-6 items-center'>
                        Emitir recibo: {isReceipt ? 'Si' : 'No'}<SwitchIcon isReceipt={isReceipt} setIsReceipt={setIsReceipt} />
                    </label>
                </div>
                
            </div>
            <div className='w-full flex justify-between mt-auto'>
                <CancelButton openModal={openModal} />
                <AcceptButton />
            </div>
        </div>
    )
}
