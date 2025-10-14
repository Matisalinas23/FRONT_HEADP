"use client"

import { useEffect, useState } from "react";
import { getUsersHttp } from "../http/userHttp";
import Image from "next/image";
import { IProfileIcon } from "../type/profileIcon";
import ModalEditProfile from "../components/Modals/ModalEditProfile";
import { authStore } from "../store/authStore";
import { useShallow } from "zustand/shallow";

export default function AccountPage() {
  const [profileIcon, setProfileIcon] = useState<IProfileIcon | null | Partial<IProfileIcon>>(null)
  const [isEditProfile, setIsEditProfil] = useState<boolean>(false)

  const { logedUser } = authStore(useShallow((state) => ({
    logedUser: state.logedUser,
  })))


  const getProfileIcon = async () => {
    if (logedUser) {
      const users = await getUsersHttp()
      const userDatabase = users?.find(u => logedUser.id === u.id)

      if (!userDatabase) {
        console.log("User database not founded in 'getProfileIcon'")
        return;
      }
      
      if (!userDatabase.profileIcon) {
        console.log("User haven't profile icon in 'getProfileIcon'")
        return;
      }

      setProfileIcon(userDatabase?.profileIcon)
    }
  }

  useEffect(() => {
    getProfileIcon()
    console.log(logedUser)
  }, [logedUser])

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
    <div className="h-screen px-88 pt-8">
      <div className="h-1/3 border-b-1 flex flex-col items-center gap-4">
        {profileIcon
          ? <Image src={profileIcon.url!} alt="profileIcon" width={180} height={180}/>
          : <Image src={"/default.png"} alt="profileIcon" width={180} height={180}/>
        }
        {logedUser
          ? <h3 className="text-xl font-normal">{logedUser.name} {logedUser.lastname}</h3>
          : <p>undefined</p>
        }
        <button className="border-1 border-[var(--darkgreen)] py-1 px-4 hover:cursor-pointer" onClick={() => setIsEditProfil(true)}>Editar Perfil</button>
      </div>
      <div className="py-8 flex justify-center">
        to-do: Purchase ordesrs
      </div>

      {isEditProfile && logedUser &&
        <div className="absolute h-screen w-screen top-0 left-0 bg-[var(--background)]/50">
          <ModalEditProfile openModal={setIsEditProfil} logedUser={logedUser}/>
        </div>
      }
    </div>
  )
}
