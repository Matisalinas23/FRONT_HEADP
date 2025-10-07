"use client"

import React, { useEffect, useState } from 'react'
import { ISale } from '../type/sale'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import useCategories from '../hooks/useCategories';
import categoryStore from '../store/categoryStore';

export default function VentaItem() {
    const [sales, setSales] = useState<ISale[]>([])
    const [saleData, setSaleData] = useState<{ category: string, total: number }[]>([])

    const SALE_URL = process.env.NEXT_PUBLIC_LOCAL_API_URL + '/sales'
    // const SALE_URL = `${API_URL}`
    // const SALE_URL = process.env.NEXT_PUBLIC_API_URL + '/sales'

    const { getCategories } = useCategories()
    const categories = categoryStore(state => state.categories)

    useEffect(() => {
        const getSalesHttp = async (): Promise<void> => {
            try {
                console.log(SALE_URL)
                const response = await axios.get(SALE_URL)
                const sales: ISale[] = response.data

                setSales(sales)
            } catch (error) {
                console.log('Error al obtener las ventas: ', error)
            }
        }

        getSalesHttp()
        getCategories()
    }, [])

    console.log(categories)

    useEffect(() => {
        if (!sales.length) return;

        const newData: { category: string, total: number }[] = [];

        sales.forEach(sale => {
            sale.product?.categories?.forEach(cat => {
                const existing = newData.find(sd => sd.category === cat.name);
                if (existing) {
                    existing.total += 1;
                } else {
                    newData.push({ category: cat.name, total: 1 });
                }
            });
        });

        

        console.log('newData antes de setSaleData:', newData);
        setSaleData(newData);
    }, [sales]);

    console.log('sale data: ', saleData)

    if (sales.length === 0) {
        return (
            <h2>No hay ventas este mes</h2>
        )
    }

    return (
        <div>
            <div className='w-full p-4 max-h-120 overflow-y-auto'>
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

            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={saleData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" fill="var(--darkgreen)" /> {/* azul Tailwind */}
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
