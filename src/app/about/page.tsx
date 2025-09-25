"use client"

import { useEffect, useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
})

export default function page() {
  const [option, setOption] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [privacyPolitics, setPrivacyPolitics] = useState<string>('')

  useEffect(() => { 
    const fetchingTxt = async () => {
      const res = await fetch(`/${option}.txt`)
      const data = await res.text();
      setContent(data)

      console.log(data)
    }

    fetchingTxt();
  }, [option])

  // Fetch fijo para políticas
  useEffect(() => {
    const fetchingPolitics = async () => {
      const res = await fetch('/politicas.txt');
      const data = await res.text();
      setPrivacyPolitics(data);
    }

    fetchingPolitics();
  }, []);

  return (
    <div className="pl-88 pr-88 mt-12">
      <h2 className="text-[var(--green)] text-xl font-semibold">Acerca de</h2>
      <p className="p-4">
        HeadP es una marca innovadora dedicada al diseño y fabricación de auriculares de alta calidad, 
        tanto on-ear como in-ear, pensados para acompañar cada aspecto de la vida moderna. 
      </p>
      <p className="p-4">
        Desde modelos casuales y discretos ideales para el día a día, 
        hasta versiones gaming de alto rendimiento y equipos especializados para PC y dispositivos móviles, 
        HeadP combina tecnología de punta con un diseño ergonómico y estético. Su catálogo busca adaptarse a todos los estilos y necesidades, 
        ofreciendo una experiencia sonora inmersiva y cómoda, sin importar el contexto de uso.
      </p>

      <h2 className="text-[var(--green)] text-xl font-semibold mt-8">Soporte</h2>
      <div className="p-4">
        <select
        className="border-1 border-[var(--green)] w-full h-10"
        onChange={(e) => setOption(String(e.target.value))}
        >
          <option>Dudas mas comunes</option>
          <option value="garantia">Garantía</option>
          <option value="comunicanos">Comunicanos</option>
          <option value="trabajemos">Trabajar con nosotros</option>
          <option value="sucursales">Sucursales</option>
        </select>

        {option === "garantia" && <pre className={`${inter.className} whitespace-pre-wrap p-4`}>{content}</pre>}
        {option === "comunicanos" && <pre className={`${inter.className} whitespace-pre-wrap p-4`}>{content}</pre>}
        {option === "trabajemos" && <pre className={`${inter.className} whitespace-pre-wrap p-4`}>{content}</pre>}
        {option === "sucursales" && <pre className={`${inter.className} whitespace-pre-wrap p-4`}>{content}</pre>}
      </div>

      <h2 className="text-[var(--green)] text-xl font-semibold mt-8">Tips de uso</h2>
      <div className="p-4 flex flex-col gap-4">
        <p>1- Todos los productos cuentan con las especificaciones de uso en la parte inferior del reverso de la caja</p>
        <p>2- Los productos inalambricos se traen un nombre para conectarlos por bluetooth en el frente superior de la caja</p>
        <p>3- Los productos inalambricos con adaptador bluetooth tambien tienen el nombre del bluetooth en el frente superior de la caja pero no pueden conectarse a dispositivos moviles</p>
        <p>4- Si se abre alguno de los productos internamente se rompera la etiqueta de garantía, por lo que la perdera inmediatamente</p>
        <p>5- No exponga el producto a temperaturas extremas ni a la luz solar directa durante períodos prolongados.</p>
        <p>6- Cargue los auriculares únicamente con el cable y adaptador incluídos o recomendados para evitar daños en la batería.</p>
        <p>7- Para modelos inalámbricos, procure mantener una distancia máxima de 10 metros del dispositivo conectado para evitar interrupciones en la señal.</p>
      </div>
      <h2 className="text-[var(--green)] text-xl font-semibold mt-8">Politicas de privacidad</h2>
      <pre className={`${inter.className} whitespace-pre-wrap p-4`}>{privacyPolitics}</pre>
    </div>
  )
}
