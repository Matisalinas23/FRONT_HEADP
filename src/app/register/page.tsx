"use client"

import { useFormik } from "formik"
import Image from "next/image"
import * as Yup from "yup"
import { useRouter } from "next/navigation"
import { IUser } from "../type/user"
import { registerUserHttp } from "../http/auth"
import { IFormik, RegisterForm } from "../components/RegisterForm"

export default function RegisterScreen() {
  const navigate = useRouter()

  const formik = useFormik<IFormik>({
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
      country: "",
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
        address: {
          particularAddress: values.particularAddress || "",
          city: values.city || "",
          province: values.province || "",
          country: values.country || ""
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

        <RegisterForm formik={formik} />
      </div>
  )
}
