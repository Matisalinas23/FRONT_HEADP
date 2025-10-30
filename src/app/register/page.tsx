"use client"

import { useFormik } from "formik"
import Image from "next/image"
import * as Yup from "yup"
import AcceptButton from "../components/AcceptButton"
import { useRouter } from "next/navigation"
import { IUser } from "../type/user"
import { registerUserHttp } from "../http/auth"

export default function RegisterScreen() {
  const navigate = useRouter()

  const formik = useFormik({
    initialValues: {
      name:"",
      lastname: "",
      email: "",
      password: "",
      dni: "",
      birthday: "",
      particularAddress: "",
      city: "",
      province: "",
      country: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Requerido"),
      lastname: Yup.string().required("Requerido"),
      email: Yup.string().email("Debe ser un correo electrónico valido").required("Requerido"),
      password: Yup.string().required("Requerido"),
      dni: Yup.string().required("Requerido").min(6, "Mínimo de 6 dígitos").max(10, "Maximo de 10 dígitos"),
      birthday: Yup.string().required("Requerido").min(10, "Introduce un formato correcto").max(10, "Introduce un formato correcto"),
      particularAddress: Yup.string().required("Requerido"),
      city: Yup.string().required("Requerido"),
      province: Yup.string().required("Requerido"),
      country: Yup.string().required("Requerido"),
    }),
    onSubmit: async (values) => {
      const userValues: IUser = {
        name: values.name,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
        dni: values.dni,
        birthday: values.birthday,
        purchaseOrders: [],
        address: {
          particularAddress: values.particularAddress,
          city: values.city,
          province: values.province,
          country: values.country
        }
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
      <div className="pt-16 flex justify-center items-start h-176">
        <Image
          src={"/joven-escuchando-musica-con-los-ojos-cerrados-edited.jpg"}
          width={420}
          height={700}
          alt="RegisterImage"
        />
        <form onSubmit={formik.handleSubmit} className="w-100 h-176 bg-[var(--darkgray)] pt-8 px-16 flex flex-col gap-4">
          <h2 className="font-semibold text-2xl flex justify-center mb-6">Registrate</h2> 
          <input
            name="name" type="text" value={formik.values.name}
            onChange={formik.handleChange} placeholder="Ingresa tu nombre"
            className="h-8 bg-[var(--gray)] pl-2 text-sm"
          />
          <input
            name="lastname" type="text" value={formik.values.lastname}
            onChange={formik.handleChange} placeholder="Ingresa tu apellido"
            className="h-8 bg-[var(--gray)] pl-2 text-sm"
          />
          <input
            name="email" type="email" value={formik.values.email}
            onChange={formik.handleChange} placeholder="Ingresa tu email"
            className="h-8 bg-[var(--gray)] pl-2 text-sm"
          />
          <input
            name="password" type="password" value={formik.values.password}
            onChange={formik.handleChange} placeholder="Ingresa tu contraseña"
            className="h-8 bg-[var(--gray)] pl-2 text-sm"
          />
          <input
            name="dni" type="text" value={formik.values.dni}
            onChange={formik.handleChange} placeholder="Ingresa tu DNI"
            className="h-8 bg-[var(--gray)] pl-2 text-sm"
          />
          <input
            name="birthday" type="text" value={formik.values.birthday}
            onChange={formik.handleChange} placeholder="dd/mm/yyyy"
            className="h-8 bg-[var(--gray)] pl-2 text-sm"
          />
          <input
            name="particularAddress" type="text" value={formik.values.particularAddress}
            onChange={formik.handleChange} placeholder="Ingresa tu direccion particular"
            className="h-8 bg-[var(--gray)] pl-2 text-sm"
          />
          <input
            name="city" type="text" value={formik.values.city}
            onChange={formik.handleChange} placeholder="Ingresa tu ciudad"
            className="h-8 bg-[var(--gray)] pl-2 text-sm"
          />
          <input
            name="province" type="text" value={formik.values.province}
            onChange={formik.handleChange} placeholder="Ingresa tu provincia"
            className="h-8 bg-[var(--gray)] pl-2 text-sm"
          />
          <input
            name="country" type="text" value={formik.values.country}
            onChange={formik.handleChange} placeholder="Ingresa tu país"
            className="h-8 bg-[var(--gray)] pl-2 text-sm"
          />
          <div className="w-full flex justify-center mt-8">
            <AcceptButton type="submit" />
          </div>
        </form>
      </div>
  )
}
