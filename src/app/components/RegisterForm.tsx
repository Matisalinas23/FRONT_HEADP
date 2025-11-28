import { FormikProps } from "formik";
import AcceptButton from "./AcceptButton";
import { authStore } from "../store/authStore";

export interface IFormik {
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

export const RegisterForm = ({ formik }: { formik: FormikProps<IFormik> }) => {
  const { logedUser } = authStore(state => state)

  return (
    <form onSubmit={formik.handleSubmit} className="w-100 h-fit bg-[var(--darkgray)] py-8 px-16 flex flex-col gap-4">
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
      {!logedUser &&
        <input
          name="particularAddress" type="text" value={formik.values.particularAddress}
          onChange={formik.handleChange} placeholder="Ingresa tu direccion particular"
          className="h-8 bg-[var(--gray)] pl-2 text-sm"
        />}
      {!logedUser &&
        <input
          name="city" type="text" value={formik.values.city}
          onChange={formik.handleChange} placeholder="Ingresa tu ciudad"
          className="h-8 bg-[var(--gray)] pl-2 text-sm"
        />}
      {!logedUser &&
        <input
          name="province" type="text" value={formik.values.province}
          onChange={formik.handleChange} placeholder="Ingresa tu provincia"
          className="h-8 bg-[var(--gray)] pl-2 text-sm"
        />}
      {!logedUser &&
        <input
          name="country" type="text" value={formik.values.country}
          onChange={formik.handleChange} placeholder="Ingresa tu país"
          className="h-8 bg-[var(--gray)] pl-2 text-sm"
        />}
      <div className="w-full flex justify-center mt-8">
        <AcceptButton type="submit" />
      </div>
    </form>
  )
}