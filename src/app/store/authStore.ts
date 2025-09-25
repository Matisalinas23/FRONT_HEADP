import { IAddress } from "@/app/type/address"
import { IUser } from "@/app/type/user"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
    logedUser: IUser | null
    token: string | null
    setLogedUser: (logedUser: IUser | null) => void
    setToken: (token: string) => void
    logout: () => void
}

export const authStore = create<AuthState>()(persist((set) => ({
    logedUser: null,
    token: null,
    setLogedUser: (logedUser) => set({ logedUser }),
    setToken: (token) => set({ token }),
    logout: () => set({ logedUser: null, token: null }),
}),{ name: "auth-storage" }))