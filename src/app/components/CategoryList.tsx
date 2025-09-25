import React, { ChangeEvent, useEffect, useState } from 'react'
import { ICategory } from '../type/category'

type CatListProps = {
    categories: ICategory[]
    formik: any
}

export default function CategoryList({ categories, formik }: CatListProps) {

    async function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { value, checked } = e.target
        const id = parseInt(value) // si usás number[]
        
        if (checked) {
            formik.setFieldValue("categories", [...formik.values.categories, id])
        } else {
            formik.setFieldValue(
            "categories",
            formik.values.categories.filter((c: number) => c !== id)
            )
        }
    }

    return (
        <div className="h-full min-w-fit pr-2 overflow-auto flex flex-col gap-1">
            {categories.map((category) => (
                <div key={category.id} className="">
                    <label>
                        <input type="checkbox" name='categories' value={category.id} onChange={handleChange}
                        className='' checked={formik.values.categories.includes(category.id)}
                        />
                        {category.name}
                    </label>
                </div>
            ))}
        </div>
    )
}
