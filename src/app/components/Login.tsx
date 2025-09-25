import React, { FC } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { useUser } from '../hooks/useUser';
import { authStore } from '../store/authStore';

type LoginProps = {
    openModal: (el: boolean) => void
}

export const Login: FC<LoginProps> = ({ openModal }) => {
    const { loginUser } = useUser()
    const logedUser = authStore(state => state.logedUser)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Requerido"),
            password: Yup.string().required("Requerido"),
        }),
        onSubmit: async (values) => {
            const success = await loginUser(values.email, values.password)

            if (!success) {
                alert("Hubo un problema al realizar el Login, intentalo ma tarde")
            }

            openModal(false)
            if (logedUser) {

            }
        }
    })

  return (
    <form onSubmit={formik.handleSubmit}
    className='absolute z-50 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 border-1 bg-[var(--darkgray)] p-8 flex flex-col justify-center items-center gap-4'
    >
        Login
        <input
        name="email"
        type="text"
        value={formik.values.email}
        onChange={formik.handleChange}
        placeholder='Ingresa tu email'
        className='h-8 bg-[var(--gray)] pl-4 text-sm'
        />
        <input
        name="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        placeholder='Ingresa tu contraseña'
        className='h-8 bg-[var(--gray)] pl-4 text-sm'
        />
        <div className='flex gap-10 '>
            <button onClick={() => openModal(false)} className='hover:cursor-pointer'>Cancelar</button>
            <button type='submit' className='hover:cursor-pointer'>Aceptar</button>
        </div>
    </form>
  )
}
