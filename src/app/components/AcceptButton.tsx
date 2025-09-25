
interface buttonProps {
  type?: "button" | "submit" | "reset",
}

export default function AcceptButton({ type, ...props }: buttonProps) {
  const buttonStyle: string = "bg-gradient-to-b from-[var(--darkgreen)] to-[var(--green)] font-normal bg-[var(--green)] w-28 h-8 hover:cursor-pointer"
  
  return (
    <button type={type} {...props} className={buttonStyle}>Aceptar</button>
  );
}