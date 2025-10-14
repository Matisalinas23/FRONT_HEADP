import { LoginResponse, loginUserHttp } from "../http/auth"
import { getUserByEmailHttp } from "../http/userHttp"
import { authStore } from "../store/authStore"
import { IUser } from "../type/user"

export const useUser = () => {
    const setLogedUser = authStore((state) => state.setLogedUser)

    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const response: LoginResponse | undefined = await loginUserHttp(email, password)

            if (!response) {
                console.log("Login was not successfully")
                return false
            }

            const user: IUser | undefined = await getUserByEmailHttp(email)

            if (!user) {
                console.log("user was not found")
                return false
            }

            setLogedUser(user)

            return true;
        } catch (error) {
            console.log("Error in 'loginUser' from useUser.ts", error)
            return false;
        }
    }

    return {
        loginUser,
    }
}