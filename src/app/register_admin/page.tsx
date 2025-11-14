"use client"

import { useFormik } from 'formik'

import { IUser } from '../type/user'
import { useRouter } from 'next/navigation'
import { registerUserHttp } from '../http/auth'
import { RegisterForm } from '../components/RegisterForm'


interface IFormik {
  name: string;
  lastname: string;
  email: string;
  password: string;
  dni: string;
  birthday: string;
  particularAddress?: string;
  city?: string;
  province?: string;
  country?: string;
  type?: "ADMIN" | "CLIENT" | undefined;
}

export default function RegisterAdminPage() {
  const navigate = useRouter()

  const formik = useFormik<IFormik>({
    initialValues: {
      name:"",
      lastname: "",
      email: "",
      password: "",
      dni: "",
      birthday: "",
      particularAddress: undefined,
      city: undefined,
      province: undefined,
      country: undefined,
      type: "ADMIN"
    },
    onSubmit: async (values) => {
      const userValues: IUser = {
        name: values.name,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
        dni: values.dni,
        birthday: values.birthday,
        type: values.type
      }

      // Regex para dd/mm/yyyy
      const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

      if (!regex.test(values.birthday)) {
          alert("Por favor introduce un formato de fecha asi: dd/mm/yyyy")
          return;
      }

      const response = await registerUserHttp(userValues)

      if (!response) {
          alert("Hubo un problema al realizar el registro, intentalo mas tarde")
          return;
      }

      localStorage.setItem('token', response.token)
      localStorage.setItem('logedUser', String(response.userId))

      navigate.push('/')
    }
  })
  return (
    <div className='flex justify-center pt-20'>
        <RegisterForm formik={formik} />
    </div>
  )
}
