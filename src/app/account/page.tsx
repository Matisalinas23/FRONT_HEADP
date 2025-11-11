"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { IProfileIcon } from "../type/profileIcon";
import ModalEditProfile from "../components/Modals/ModalEditProfile";
import { authStore } from "../store/authStore";
import { useShallow } from "zustand/shallow";
import { getProfileIconByUserIdHttp } from "../http/profileIconsHttp";

export default function AccountPage() {
  const [profileIcon, setProfileIcon] = useState<IProfileIcon | null | Partial<IProfileIcon>>(null)
  const [isEditProfile, setIsEditProfil] = useState<boolean>(false)

  const { logedUser } = authStore(useShallow((state) => ({
    logedUser: state.logedUser,
  })))

  const getProfileIcon = async () => {
    const logedUserId = Number(localStorage.getItem("logedUser"))
    const profileIcon = await getProfileIconByUserIdHttp(logedUserId)

    if (!profileIcon) {
      console.log("profileIcon was not found")
      return
    }

    setProfileIcon(profileIcon)
  }

  useEffect(() => {
    getProfileIcon()
  }, [logedUser])

  const handleEditProfile = () => {
    if (!logedUser?.address) {
      console.log("Address was not founded")
    } else {
      setIsEditProfil(true)
    }
  }

  if (!logedUser) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <h2 className="text-[2rem] font-semibold text-neutral-500">No puedes acceder a esta página si no inicias sesión</h2>
      </div>
    )
  }

  if (logedUser && logedUser.type === 'ADMIN') {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <h2 className="text-[2rem] font-semibold text-neutral-500">Debes iniciar sesión como cliente para ver esta página</h2>
      </div>
    )
  }

  return (
    <div className="h-screen pt-16">
      <div className="flex flex-col items-center gap-8">
        {profileIcon
          ? <Image src={profileIcon.url!} alt="profileIcon" width={180} height={180}/>
          : <Image src={"/default.png"} alt="profileIcon" width={180} height={180}/>
        }

        <h3 className="text-xl font-normal text-center">{logedUser.name} {logedUser.lastname}</h3>

        <button
        className="border-1 border-[var(--darkgreen)] py-1 px-4 hover:cursor-pointer"
        onClick={handleEditProfile}
        >
          Editar Perfil
        </button>
      </div>

      {isEditProfile && logedUser &&
        <div className="absolute h-screen w-screen top-0 left-0 bg-[var(--background)]/50">
          <ModalEditProfile openModal={setIsEditProfil} logedUser={logedUser}/>
        </div>
      }
    </div>
  )
}
