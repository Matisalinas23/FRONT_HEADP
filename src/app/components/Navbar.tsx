"use client"

import Link from "next/link";
import Searchbar from "./Searchbar";
import UserIcon from "@/svg/user-circle-svgrepo-com.svg"
import CartiIcon from "@/svg/cart-shopping-svgrepo-com.svg"
import LogoutIcon from "@/svg/logout-svgrepo-com.svg"
import { useEffect, useState } from "react";
import { Login } from "./Login";
import { useRouter } from "next/navigation";  
import { authStore } from "../store/authStore";
import { useShallow } from "zustand/shallow";
import ModalCart from "./Modals/ModalCart";
import Image from "next/image";

export default function Navbar() {
  // Local states
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);
  const [isCart, setIsCart] = useState<boolean>(false)


  const navigate = useRouter()

  // Tailwind styles
  const ulStyle: string = "absolute z-50 top-16 right-8 w-80 mr-12 text-[var(--white)] bg-[var(--darkgray)] border-2 border-[var(--lightgray2)] p-4 flex flex-col justify-between"
  const liStyle: string = "pl-4 hover:cursor-pointer"
  const divlaneStyle: string = "w-71 mt-4 mb-4 border-t-1 border-[var(--lightgray2)]"
  
  const { logedUser, setLogedUser, setToken } = authStore(useShallow((state) => ({
    logedUser: state.logedUser,
    setLogedUser: state.setLogedUser,
    setToken: state.setToken
  })))

  useEffect(() => {
    let hasLoggedOut: boolean = false // Local flag

    const handleLogout = () => {
      if (hasLoggedOut) return;
      
      hasLoggedOut = true
      alert("La sesión ha expirado, por favor, vuelve a iniciar sesión")
      navigate.push("/")
      setLogedUser(null)
    }

    window.addEventListener("userLoggedOut", handleLogout);
    return () => window.removeEventListener("userLoggedOut", handleLogout);
  }, [])
  

  // arrow functions =>
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
      <nav className="min-h-30 text-white px-4 flex flex-row items-center justify-between gap-4 xl:min-h-20 bg-[var(--darkgray)] lg:px-24">
        <Link href="/" className="text-4xl font-bold text-[var(--darkgreen)]">{logedUser?.type==="ADMIN" ?  "HeadP Admin Page" : "HeadP"}</Link>

        <div className="w-fit xl:flex-row flex flex-col items-center gap-4 gap-x-12">
          {logedUser && logedUser.type==="ADMIN"
            ?
            <div className="flex gap-4">
              <Link href="/product_management" className="text-[var(--green)]">Gestión de producto</Link>
              <Link href="/logs" className="text-[var(--green)]">Registros</Link>
            </div>
            :
            <>
            <div className="flex items-center gap-4 text-sm">
              <Link href={{ pathname: '/product_page', query: { category: 'Gaming' } }} className="text-[var(--green)]">GAMING</Link>
              <Link href={{ pathname: '/product_page', query: { category: 'IN-EAR' } }} className="text-[var(--green)]">INEAR</Link>
              <Link href={{ pathname: '/product_page', query: { category: 'ON-EAR' } }} className="text-[var(--green)]">ONEAR</Link>
              <Link href="/about" className="text-[var(--green)]">SOPORTE</Link>
            </div>
            </>
          }

          <div className="flex w-80 xl:w-1/2 justify-center">
            <Searchbar />
          </div>
        </div>

      <div className="flex w-40 items-center gap-8 mr-4">
          { logedUser === null || logedUser && logedUser.type === "CLIENT" &&
            <CartiIcon className="h-8 min-w-8 max-w-8 stroke-[var(--darkgreen)] hover:cursor-pointer" onClick={handleCart} />
          }
          {logedUser && logedUser.profileIcon
            ? <Image src={logedUser.profileIcon.url} alt={logedUser.profileIcon.name} width={30} height={30} className="cursor-pointer" onClick={handleUserIcon}/>
            : <UserIcon className="h-8 w-8 stroke-[var(--darkgreen)] hover:cursor-pointer" onClick={handleUserIcon}/>
          }
          {logedUser && <LogoutIcon className="h-8 min-w-8 max-w-8 stroke-[var(--darkgreen)] hover:cursor-pointer" onClick={logOut}/>}
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
