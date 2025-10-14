"use client"

import Link from "next/link";
import Searchbar from "./Searchbar";
import UserIcon from "@/svg/user-circle-svgrepo-com.svg"
import CartiIcon from "@/svg/cart-shopping-svgrepo-com.svg"
import LogoutIcon from "@/svg/logout-svgrepo-com.svg"
import { useState } from "react";
import { Login } from "./Login";
import { useRouter } from "next/navigation";  
import { authStore } from "../store/authStore";
import { useShallow } from "zustand/shallow";
import ModalCart from "./Modals/ModalCart";

export default function Navbar() {
  // Local states
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);
  const [isCart, setIsCart] = useState<boolean>(false)


  const navigate = useRouter()

  // TailwindStyles (i move this styles here to code looks more cleen)
  const ulStyle: string = "absolute z-50 top-16 right-8 w-80 mr-12 text-[var(--white)] bg-[var(--darkgray)] border-2 border-[var(--lightgray2)] p-4 flex flex-col justify-between"
  const liStyle: string = "pl-4 hover:cursor-pointer"
  const divlaneStyle: string = "w-71 mt-4 mb-4 border-t-1 border-[var(--lightgray2)]"
  
  const { logedUser, setLogedUser, setToken } = authStore(useShallow((state) => ({
    logedUser: state.logedUser,
    setLogedUser: state.setLogedUser,
    setToken: state.setToken
  })))
  

  // onClick arrow functions =>
  const openLogin = () => {
    setIsDropdown(false)
    setIsOpenLogin(true)
  }

  const logOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('logedUser')
    setToken("")
    setLogedUser(null)
    setIsCart(false)
    navigate.push("/")
  }

  const navigateToRegister = () => {
    setIsDropdown(false);
    navigate.push("/register")
  }

  const handleUserIcon = () => {
    if (!logedUser) {
      setIsDropdown(!isDropdown)
    } else {
      if (logedUser.type === 'ADMIN') {
        navigate.push('/product_management')
        return;
      }
      setIsCart(false)
      setIsOpenLogin(false)
      navigate.push("/account")
    }
  }

  const handleCart = () => {
      setIsCart(!isCart)
      setIsDropdown(false)
      setIsOpenLogin(false)
  }

  return (
    <div className="flex flex-col">
      <nav className="h-20 flex items-center justify-between bg-[var(--darkgray)] text-white pl-24 pr-24">
        {logedUser && logedUser.type==="ADMIN"
          ?
          <>
          <Link href="/"><h1 className="text-4xl font-bold text-[var(--darkgreen)]">HeadP Admin Page</h1></Link>
          <Link href="/product_management" className="text-[var(--green)]">Gestión de producto</Link>
          <Link href="/logs" className="text-[var(--green)]">Registros</Link>
          </>
          :
          <>
          <Link href="/"><h1 className="text-4xl font-bold text-[var(--darkgreen)]">HeadP</h1></Link>
          <div className="flex items-center gap-12 text-sm">
            <Link href="/product_page" className="text-[var(--green)]">GAMING</Link>
            <Link href="/product_page" className="text-[var(--green)]">IN-EAR</Link>
            <Link href="/product_page" className="text-[var(--green)]">ON-EAR</Link>
            <Link href="/product_page" className="text-[var(--green)]">ACCESORIOS</Link>
            <Link href="/about" className="text-[var(--green)]">SOPORTE</Link>
          </div>
          </>
        }

      <div className="flex w-1/2 justify-center">
        <Searchbar />
      </div>

      <div className="flex items-center gap-8 mr-4">
          { logedUser === null || logedUser && logedUser.type === "CLIENT" &&
            <CartiIcon className="h-8 w-8 stroke-[var(--darkgreen)] hover:cursor-pointer" onClick={handleCart} />
          }
          <UserIcon className="h-8 w-8 stroke-[var(--darkgreen)] hover:cursor-pointer" onClick={handleUserIcon}/>
          {logedUser && <LogoutIcon className="h-8 w-8 stroke-[var(--darkgreen)] hover:cursor-pointer" onClick={logOut}/>}
        </div>
    </nav>

    {isDropdown &&
      <ul className={ulStyle}>
        <li className={liStyle} onClick={navigateToRegister}>Crear Cuenta</li>
        <div className={divlaneStyle}></div>
        <li className={liStyle} onClick={openLogin}>Iniciar Sesion</li>
      </ul>
    }

    {isOpenLogin &&
      <div className="absolute z-40 h-screen w-screen bg-[var(--background)]/50">
        <Login openModal={setIsOpenLogin} />
      </div>
    }

    {isCart && logedUser &&
      <ModalCart logedUser={logedUser} closeModal={setIsCart} />
    }
    </div>
  )
}
