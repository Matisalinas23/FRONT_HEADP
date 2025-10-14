import React from 'react'
import { FaRegMinusSquare, FaRegPlusSquare } from 'react-icons/fa'
import CancelButton from '../CancelButton'
import AcceptButton from '../AcceptButton'
import { authStore } from '@/app/store/authStore'
import { useFormik } from 'formik'
import { createCartItemHttp } from '@/app/http/cartItemHttp'
import { IProduct } from '@/app/type/product'

type ModalAddToCartProps = {
    product: IProduct
    openModal: (boolean: boolean) => void
}

export default function ModalAddToCart({ product, openModal }: ModalAddToCartProps) {
    const logedUser = authStore(state => state.logedUser)

    const handleMinus = () => {
        if (formik.values.quantity > 1) {
            formik.setFieldValue("quantity", formik.values.quantity - 1)
        }
    }

    const handlePlus = () => {
        formik.setFieldValue("quantity", formik.values.quantity + 1)
    }

    const formik = useFormik({
        initialValues: {
            quantity: 1
        },
        onSubmit: async (values) => {
            if (!logedUser) {
                alert('Error: usuario no logueado')
                console.log('LogedUser is null: ', logedUser)
                return;
            }

            if (values.quantity <= 0) {
                console.log('no se envia nada')
                return
            }

            console.log("Value: ", values.quantity)

            await createCartItemHttp(values.quantity, logedUser.id!, product.id)

            openModal(false)
        }
    })

    return (
        <form className='absolute w-80 p-8 bg-[var(--darkgray)]' onSubmit={formik.handleSubmit}>
            <h3 className='text-2xl font-normal w-full text-center mb-4'>Cantidad</h3>
            <div className='px-3  py-1 h-fit bg-[var(--background)] flex mb-6 items-center'>
                <button type="button" className="h-fit w-fit text-xl cursor-pointer" onClick={handleMinus}>
                    <FaRegMinusSquare />
                </button>
                <input className='w-full text-lg h-8 text-center'
                    type="text" name='quantity' value={formik.values.quantity} onChange={formik.handleChange}
                />
                <button type='button' className='h-fit w-fit text-xl cursor-pointer' onClick={handlePlus}>
                    <FaRegPlusSquare />
                </button>
            </div>

            <div className='w-full flex justify-between'>
                <CancelButton openModal={openModal} />
                <AcceptButton type='submit' />
            </div>
        </form>
    )
}
