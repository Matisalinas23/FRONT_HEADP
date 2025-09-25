import React, { useEffect, useState } from 'react'
import CancelButton from '../CancelButton'
import AcceptButton from '../AcceptButton'
import AddIcon from "@/svg/add-square-svgrepo-com.svg"
import MinusIcon from "@/svg/minus-square-svgrepo-com.svg"
import { useFormik } from 'formik'
import * as Yup from "yup"
import { ICategory } from '../../type/category'
import { createCategoryHttp } from '../../http/categoriesHttp'

type ModalCreateCategoryProps = {
    openModal: (el: boolean) => void
    getCategories: () => void
}

export default function ModalCreateCategory({ openModal, getCategories }: ModalCreateCategoryProps) {

  const [counter, setCounterValue] = useState<number>(1)

  const inputStyle = "w-full h-8 bg-[var(--gray)] pl-2"

  const formik = useFormik({
    initialValues: {
      category_a: "",
      category_b: "",
      category_c: "",
      category_d: "",
      category_e: "",
      category_f: "",
    },
    validationSchema: Yup.object({
      category_a: Yup.string().required("Requerido").min(2, "Al menos 2 caracteres").max(12, "Máximo 12 caracteres"),
      category_b: Yup.string().min(2, "Al menos 2 caracteres").max(12, "Máximo 12 caracteres"),
      category_c: Yup.string().min(2, "Al menos 2 caracteres").max(12, "Máximo 12 caracteres"),
      category_d: Yup.string().min(2, "Al menos 2 caracteres").max(12, "Máximo 12 caracteres"),
      category_e: Yup.string().min(2, "Al menos 2 caracteres").max(12, "Máximo 12 caracteres"),
      category_f: Yup.string().min(2, "Al menos 2 caracteres").max(12, "Máximo 12 caracteres"),
    }),
    onSubmit: async (values) => {
      const formValues: ICategory[] = [{ name:  values.category_a }]

      if (counter === 2) {
        formValues.push({ name: values.category_b })
      }
      if (counter === 3) {
        formValues.push({ name: values.category_c },{ name: values.category_b })
      }
      if (counter === 4) {
        formValues.push({ name: values.category_d },{ name: values.category_c },{ name: values.category_b })
      }
      if (counter === 5) {
        formValues.push({ name: values.category_e },{ name: values.category_d },{ name: values.category_c },{ name: values.category_b })
      }
      if (counter === 6) {
        formValues.push({ name: values.category_f },{ name: values.category_e },{name: values.category_d },{ name: values.category_c },{ name: values.category_b })
      }

      formValues.forEach(async(category) => {
        const success = await createCategoryHttp(category)

        if (!success) {
          alert(`Error al crear la categoría: ${category.name}`)
        } else {
          console.log("Category created: ", success)

          getCategories()
          openModal(false)
        }
      })
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} className="w-140 py-12 px-16 absolute top-20 left-1/2 -translate-x-1/2 border-1 bg-[var(--darkgray)] flex flex-col items-center">
      <h3 className='text-2xl font-semibold mb-8'>Crear Categoría</h3>
      
      <div className='mb-4 w-full h-64 flex flex-col justify-center items-center gap-2 rounded-2xl border-4 border-[var(--gray)] px-4'>
        <input className={inputStyle} type="text" name="category_a" value={formik.values.category_a}
        onChange={formik.handleChange} placeholder="Ingresa una categoria"/>

        {counter > 1 &&
        <input className={inputStyle} type="text" name="category_b" value={formik.values.category_b}
        onChange={formik.handleChange} placeholder="Ingresa una categoria"/>
        }

        {counter > 2 &&
        <input className={inputStyle} type="text" name="category_c" value={formik.values.category_c}
        onChange={formik.handleChange} placeholder="Ingresa una categoria"/>
        }

        {counter > 3 &&
        <input className={inputStyle} type="text" name="category_d" value={formik.values.category_d}
        onChange={formik.handleChange} placeholder="Ingresa una categoria"/>
        }

        {counter > 4 &&
        <input className={inputStyle} type="text" name="category_e" value={formik.values.category_e}
        onChange={formik.handleChange} placeholder="Ingresa una categoria"/>
        }

        {counter > 5 &&
        <input className={inputStyle} type="text" name="category_f" value={formik.values.category_f}
        onChange={formik.handleChange} placeholder="Ingresa una categoria"/>
        }
      </div>
      
      <div className='w-full px-2 flex justify-between items-center'>
        <MinusIcon width={52} height={52} className="fill-[var(--lightgray)] hover:cursor-pointer mb-10"
        onClick={counter > 1 ? () => setCounterValue(counter - 1) : ()=>{}}
        />
        <AddIcon width={44} height={44} className="fill-[var(--lightgray)] hover:cursor-pointer mb-10"
        onClick={counter < 6 ? () => setCounterValue(counter + 1) : ()=>{}}
        />
      </div>

      <div className='w-full px-2 flex justify-between'>
        <CancelButton openModal={openModal}/>
        <AcceptButton type='submit'/>
      </div>
    </form>
  )
}
