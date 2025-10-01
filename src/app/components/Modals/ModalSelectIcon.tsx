import { addProfileIconHttp } from "../../http/userHttp";
import { authStore } from "../../store/authStore";
import { IProfileIcon } from "../../type/profileIcon";
import { IUser } from "../../type/user";
import AcceptButton from "../AcceptButton";
import CancelButton from "../CancelButton";

type ModalSelectIconProops = {
    openModal: (el: boolean) => void
    icon: IProfileIcon
    logedUser: IUser
}

export default function ModalSelectIcon({ openModal, icon, logedUser }: ModalSelectIconProops) {
    const setLogedUser = authStore((state) => state.setLogedUser)

    const handleSelectIcon = async () => {
        if (!logedUser.profileIcon) {
            const userData: Partial<IUser> = {
                profileIcon: { id: icon.id }
            }

            const updatedUser = await addProfileIconHttp(logedUser.id!, userData)

            if (!updatedUser) {
                alert("Algo salio mal al seleccionar el ícono, intentalo mas tarde")
                return;
            }

            setLogedUser(updatedUser);
            console.log("loged user: ", logedUser)
            openModal(false);
        } else {
            const userData: Partial<IUser> = {
                profileIcon: {
                    id: icon.id
                }
            }

            const updatedUser = await addProfileIconHttp(logedUser.id!, userData)

            if (!updatedUser) {
                alert("Algo salio mal al seleccionar el ícono, intentalo mas tarde")
                return;
            }

            console.log(updatedUser)
            setLogedUser(updatedUser);
            console.log("loged user: ", logedUser)
            openModal(false);
        }
    }
    
    return (
        <div className="text-xl w-130 font-normal px-8 py-12 bg-[var(--gray)] flex flex-col gap-12 items-center">
            <h2>¿Seguro que quieres seleccionar este icono?</h2>
            <div className="flex justify-between w-full px-16">
                <CancelButton openModal={openModal} />
                <div onClick={handleSelectIcon}>
                    <AcceptButton/>
                </div>
            </div>
        </div>
    )
}
