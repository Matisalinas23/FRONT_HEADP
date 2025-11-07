import React, { FC, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { useUser } from '../hooks/useUser';
import Loading from './Loading/Loading';
import UserIcon from '@/svg/user-circle-svgrepo-com.svg'
import CancelButton from './CancelButton';
import AcceptButton from './AcceptButton';

type LoginProps = {
    openModal: (el: boolean) => void
}

export const Login: FC<LoginProps> = ({ openModal }) => {
    const [isLogin, setIsLogin] = useState<boolean>(false)

    const { loginUser } = useUser()

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
            setIsLogin(true)
            const success = await loginUser(values.email, values.password)

            if (!success) {
                setIsLogin(false)
                alert("Hubo un problema con la contraseña o el email.")
                return
            }

            setIsLogin(false)
            openModal(false)
            //window.location.reload()
        }
    })

  return (
    <>
        <form onSubmit={formik.handleSubmit} className='absolute z-50 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-86 bg-[var(--darkgray)]
        px-12 py-10 shadow-xl flex flex-col justify-center items-center gap-10'
        >
            <UserIcon className="w-10 h-10 stroke-neutral-400"/>

            <div className='flex flex-col gap-6 w-full mb-6'>
                <label className='flex flex-col'>
                    Correo:
                    <input
                    name="email"
                    type="text"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder='Ingresa tu email'
                    className='h-8 bg-[var(--gray)] pl-2 text-sm'
                    />
                </label>
                <label className='flex flex-col'>
                    Contraseña:                            
                    <input
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder='Ingresa tu contraseña'
                    className='h-8 bg-[var(--gray)] pl-2 text-sm'
                    />
                </label>
            </div>
            <div className='w-full flex justify-between'>
                <CancelButton openModal={openModal} />
                <AcceptButton />
            </div> 
        </form>

        {isLogin &&
            <div className='fixed inset-0 z-99 h-[100vh] w-full  bg-black/50 flex justify-center items-center'>
                <Loading/>
            </div>
        }
    </>
  )
}
