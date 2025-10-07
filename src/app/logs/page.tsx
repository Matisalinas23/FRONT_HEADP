import VentaItem from '../components/VentaItem'

export default function Logs() {
  return (
    <div className='py-8 flex flex-col items-center'>
      <div className='w-280 flex flex-col items-center'>
        <h2 className='w-full text-[2rem] mb-8'><span className='font-semibold'>Registro</span> de Ventas</h2>
        <VentaItem />
      </div>
    </div>
  )
}
