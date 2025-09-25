import { loginUserHttp, registerUserHttp } from "../http/auth"
import { getUserByEmailHttp, getUsersHttp } from "../http/userHttp"
import { authStore } from "../store/authStore"
import { IUser } from "../type/user"

export const useUser = () => {

    const setLogedUser = authStore((state) => state.setLogedUser)
    const setToken = authStore((state) => state.setToken)

    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const token = await loginUserHttp(email, password)

            if (!token) throw new Error("Error 'token' in loginUser")

            // save token in global sotre
            setToken(token)

            // get all users to find the corresponding
            const users = await getUsersHttp()

            if (!users) throw new Error("Error 'users' in loginUser")

            console.log("All users: ", users)
            const user = users.find((u) => u.email === email) // find a corresponding user

            if (!user) throw new Error("Error 'find user' in loginUser")

            // save loged user in global sotre
            console.log("User found: ", user)
            setLogedUser(user)

            return true;
        } catch (error) {
            console.log("Error in 'loginUser' from useUser.ts", error)
            return false;
        }
    }

    const registerUser = async (userData: IUser): Promise<boolean> => {
        try {
            const token = await registerUserHttp(userData)
            

            if (!token) throw new Error("Token error in 'registerUser'")

            //console.log(token)
            const registeredUser = await getUserByEmailHttp(userData.email)

            if (!registeredUser) throw new Error("registeredUser error in 'registerUser'")

            //console.log(registerUser)
            localStorage.setItem("token", token)
            localStorage.setItem("logedUser", registeredUser.id!.toString())

            return true;
        } catch (error) {
            console.log("Error en 'registerUser' ", error)
            return false;
        }
    }

    return {
        loginUser,
        registerUser,
    }
}