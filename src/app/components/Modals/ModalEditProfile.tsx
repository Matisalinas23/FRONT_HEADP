"use client"

import { useEffect, useState } from "react"
import { IProfileIcon } from "../../type/profileIcon"
import { getAllProfileIconsHttp } from "../../http/profileIconsHttp"
import Image from "next/image"
import AcceptButton from "../AcceptButton"
import CancelButton from "../CancelButton"
import { useFormik } from "formik"
import * as Yup from "yup"
import { updateUserHttp } from "../../http/userHttp"
import { IUser } from "../../type/user"
import ModalSelectIcon from "./ModalSelectIcon"

type EditProfileProps = {
    openModal: (el: boolean) => void,
    logedUser: IUser
}

export default function ModalEditProfile({ openModal, logedUser }: EditProfileProps) {
    const [profileIcons, setProfileIcons] = useState<IProfileIcon[]>([])
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [selectedIcon, setSelectedIcon] = useState<IProfileIcon | null>(null)

    const getAllProfileIcons = async () => {
        const profileIcons = await getAllProfileIconsHttp()

        if (!profileIcons) {
            console.log("Error with profile icons: ", profileIcons)
            return;
        }

        setProfileIcons(profileIcons)
        console.log("Profile icons obtained: ", profileIcons)
    }

    const handleOpenModal = (profileIcon: IProfileIcon) => {
        setSelectedIcon(profileIcon);
        setIsOpenModal(true);
    }

    useEffect(() => {
        getAllProfileIcons()
    }, [])

    const formik = useFormik({
        initialValues: {
            name: logedUser.name,
            email: logedUser.email,
            particularAddress: logedUser.address ? logedUser.address.particularAddress : "",
            city: logedUser.address ? logedUser.address.city : "",
            province: logedUser.address ? logedUser.address.province : "",
            country: logedUser.address ? logedUser.address.country : ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Requerido").max(16, "No debe superar los 16 caracteres").min(2, "Debe tener al menos 2 caracteres"),
        }),
        onSubmit: async (values) => {
            // 'updateUser' needs addresses values in an address object
            const userValues: Partial<IUser> = {
                name: values.name,
                email: values.email,
                address: {
                    particularAddress: values.particularAddress,
                    city: values.city,
                    province: values.province,
                    country: values.country,
                }
            }

            const success = await updateUserHttp(logedUser.id!, userValues)

            if (!success) {
                alert("Hubo un problema al realizar el Login, intentalo mas tarde")
            }

            openModal(false)
        }
    })

    return (
        <div className="w-240 h-160 absolute top-20 left-1/2 -translate-x-1/2 py-4 px-28 bg-[var(--darkgray)] flex flex-col items-center">
            <h3 className="my-2 w-full text-lg text-[var(--green)] flex gap-1"><p className="font-semibold">Selecciona</p> un ícono de perfil</h3>
            <div className="w-full max-h-40 overflow-y-auto py-2 mb-8 grid grid-cols-4 gap-y-8 place-items-center">
                {profileIcons.map((pi) => (
                    <Image
                    key={pi.id} src={pi.url} alt={pi.name}
                    width={116} height={116} className="hover:cursor-pointer"
                    onClick={() => handleOpenModal(pi)}
                    />
                ))}
            </div>
            <h3 className="my-2 w-full text-lg text-[var(--green)] flex gap-1"><p className="font-semibold">Editar</p> informacion del perfil</h3>
            <form className="w-full flex flex-col gap-8" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-2 px-8">
                    <input
                    name="name"
                    type="text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    placeholder='Ingresa tu nombre'
                    className='h-8 bg-[var(--gray)] pl-4 text-sm'
                    />
                    <input
                    name="email"
                    type="text"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder='Ingresa tu email'
                    className='h-8 bg-[var(--gray)] pl-4 text-sm'
                    />
                    <input
                    name="particularAddress"
                    type="text"
                    value={formik.values.particularAddress}
                    onChange={formik.handleChange}
                    placeholder='Ingresa tu direccion particular'
                    className='h-8 bg-[var(--gray)] pl-4 text-sm'
                    />
                    <input
                    name="city"
                    type="text"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    placeholder='Ingresa tu ciudad'
                    className='h-8 bg-[var(--gray)] pl-4 text-sm'
                    />
                    <input
                    name="province"
                    type="text"
                    value={formik.values.province}
                    onChange={formik.handleChange}
                    placeholder='Ingresa tu provincia'
                    className='h-8 bg-[var(--gray)] pl-4 text-sm'
                    />
                    <input
                    name="country"
                    type="text"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    placeholder='Ingresa tu país'
                    className='h-8 bg-[var(--gray)] pl-4 text-sm'
                    />
                </div>

                <div className="w-full flex justify-between">
                    <CancelButton openModal={openModal}/>
                    <AcceptButton type="submit"/>
                </div>
            </form>
            {isOpenModal &&
                <div className="absolute top-1/4 left-1/2 -translate-1/2">
                    <ModalSelectIcon openModal={setIsOpenModal} icon={selectedIcon!} logedUser={logedUser} />
                </div>
            }
        </div>
    )
}
