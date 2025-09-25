
interface ButtonProps {
  openModal: (el: boolean) => void
}

export default function CancelButton({ openModal, ...props }: ButtonProps) {
  return (
    <button className="bg-[var(--background)] w-28 h-8 font-normal hover:cursor-pointer" {...props} onClick={() => openModal(false)}>Cancelar</button>
  )
}
