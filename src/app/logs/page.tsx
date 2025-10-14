"use client"

import { useEffect, useState } from 'react'
import { ISale } from '../type/sale'
import { getAllSalesHttp } from '../http/salesHttp'
import SalesChart from '../components/SalesChart'
import Loading from '../components/Loading/Loading'

export default function Logs() {
  const [sales, setSales] = useState<ISale[]>([])
  const [data, setData] = useState<{ name: string, quantity: number }[]>([])

  const getData = (sales: ISale[]) => {
    const tempData: { name: string, quantity: number }[] = [];

    sales.forEach(sale => {
      if (tempData.length === 0) {
        tempData.push({ name: sale.product.name, quantity: 1 })
      } else {

        let isSaleRepeated: boolean = false

        tempData.forEach(d => {
          if (d.name === sale.product.name) {
            d.quantity++
            isSaleRepeated = true
          }
        })

        if (!isSaleRepeated) {
          tempData.push({ name: sale.product.name, quantity: 1 })
        }
      }
    });

    console.log("Data: ", tempData)
    setData(tempData)
  }

  useEffect(() => {
    const getSalesAndData = async (): Promise<void> => {
      try {
        const sales: ISale[] = await getAllSalesHttp()

        if (sales.length === 0) {
          console.log("Sales were not found")
        }

        setSales(sales)

        console.log("Sales: ", sales)

        getData(sales)
      } catch (error) {
        console.log('Error al obtener las ventas: ', error)
      }
    }

    getSalesAndData()
  }, [])

  if (sales.length === 0) {
    return (
      <div className='h-[80vh]'>
        <Loading />
      </div>
    )
  }
  return (
    <div className='pt-8 pb-56 px-60 flex flex-col items-center gap-40'>
      <div className='w-280 flex flex-col items-center'>
        <h2 className='w-full text-[2rem] mb-8'><span className='font-semibold'>Registro</span> de Ventas</h2>
        <div className='w-[96%] p-4 max-h-120 overflow-y-auto'>
          {sales.map((sale) => (
            <div key={sale.id} className='w-full h-12 px-8 bg-[var(--darkgray)] mb-4 flex items-center duration-150 hover:scale-x-102'>
              <h3 className='max-h-7 w-3/5 text-[19px] overflow-y-hidden'>{sale.product.name}</h3>
              <div className='pl-4 h-full flex-1 flex items-center justify-between'>
                <p>Precio: ${sale.product.price}</p>
                <p>Fecha de venta: {new Date(sale.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <SalesChart data={data} />
    </div>
  )
}
