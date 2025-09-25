import FacebookIcon from "@/svg/facebook-svgrepo-com.svg"
import YoutubeIcon from "@/svg/youtube-svgrepo-com.svg"
import InstagramIcon from "@/svg/instagram-svgrepo-com.svg"
import TwitterIcon from "@/svg/twitter-svgrepo-com.svg"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="h-48 text-[var(--green)] bg-[var(--darkgray)] border-t-1 border-[var(--green)] flex flex-col items-center justify-center p-4 shrink-0">
      <div className="flex items-center flex-col gap-4">
        <Link href={"/"}><h1 className="font-bold text-4xl text-[var(--darkgreen)]">HeadP</h1></Link>
        <div className="flex items-center gap-6 text-white">
          <p><b className="font-semibold">Nuestras</b> redes:</p>
          <Link href={"/"}><FacebookIcon className="h-6 w-6 fill-[var(--green)]" /></Link>
          <Link href={"/"}><YoutubeIcon className="h-6 w-6 fill-[var(--green)]" /></Link>
          <Link href={"/"}><InstagramIcon className="h-6 w-6 fill-[var(--green)]" /></Link>
          <Link href={"/"}><TwitterIcon className="h-6 w-6 fill-[var(--green)]" /></Link>
        </div>
      </div>

      <div className="w-full h-0 border-t-1 border-[var(--lightgray2)] mt-4 mb-4"></div>

      <div className="flex items-center justify-center gap-16">
        <Link href={"/about"}><p>Acerca de</p></Link>
        <Link href={"/about"}><p>Soporte</p></Link>
        <Link href={"/about"}><p>Tips de uso</p></Link>
        <Link href={"/about"}><p>Politicas de privacidad</p></Link>
      </div>
    </footer>
  )
}
