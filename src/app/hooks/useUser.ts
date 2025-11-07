import { loginUserHttp } from "../http/auth"
import { getUserByEmailHttp, getUserByIdHttp } from "../http/userHttp"
import { authStore } from "../store/authStore"
import { IUser } from "../type/user"

export const useUser = () => {
    const setLogedUser = authStore((state) => state.setLogedUser)

    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const response = await loginUserHttp(email, password)

            if (!response) {
                console.log("Login was not successfully")
                return false
            }

            const user: IUser | undefined = await getUserByEmailHttp(email)

            if (!user) {
                console.log("user was not found")
                return false
            }

            console.log("Loged User: ", user)
            setLogedUser(user)

            return true;
        } catch (error) {
            console.log("Error in 'loginUser' from useUser.ts", error)
            return false;
        }
    }

    const getLogedUser = async () => {
        try {
            const logedUserId = localStorage.getItem('logedUser')

            if (!logedUserId || logedUserId === null) {
                console.log("LogedUserId was not founded")
                return
            }

            const logedUser = await getUserByIdHttp(Number(logedUserId))

            if (!logedUser) {
                console.log("LogedUser was not founded")
                return false
            }

            setLogedUser(logedUser)

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    return {
        loginUser,
        getLogedUser,
    }
}