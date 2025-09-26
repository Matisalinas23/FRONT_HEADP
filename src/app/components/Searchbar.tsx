import React, { ChangeEvent, FormEvent, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import productStore from '../store/productStore'
import { IProduct } from '../type/product'

export default function Searchbar() {
  const [activeSearch, setActiveSearch] = useState<string[]>([])
  const [value, setValue] = useState<string>('')

  const products: IProduct[] | [] = productStore(state => state.products)

  const navigate = useRouter()

  const words: string[] = products.map(p => p.name)

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = e.target.value

    setValue(inputValue)

    if (inputValue === "") {
      setActiveSearch([])
      return
    }

    setActiveSearch(
      words
        .filter(w => w.toLowerCase().includes(inputValue.toLowerCase()))
        .slice(0, 8)
    )
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!value) {
      navigate.push('/product_page')
      return;
    }
    
    navigate.push(`/product_page?search=${encodeURIComponent(value)}`)
  }

  return (
    <form className='w-120 relative' onSubmit={handleSubmit}>
      <div className='relative'>
        <input type="search" placeholder='Buscar productos o marcas...' value={value ? value : ""} onChange={handleSearch}
        className='w-full h-10 px-4 rounded-full bg-[var(--background)] text-neutral-200'
        />
        <button type='submit' className='absolute border-l-1 border-[var(--lightgray)] bg-[var(--background)] text-2xl right-0 top-1/2 -translate-y-1/2 h-full px-3 rounded-r-full cursor-pointer'>
          <AiOutlineSearch />
        </button>
      </div>

      {activeSearch.length > 0 &&
        <div className='absolute w-full z-1 border-1 border-[var(--gray)] mt-2 px-4 py-2 bg-[var(--background)] rounded-[12px]'>
          {activeSearch.map((word) => (
            <p key={word} className='p-2 align-middle line-clamp-1 my-2 cursor-pointer hover:bg-[var(--gray)] rounded-[10px]'
            onClick={() => {
              navigate.push(`/product_page?search=${encodeURIComponent(word)}`)
              setValue(word)
            }}
            >
              {word}
            </p>
          ))}
        </div>
      }
    </form>
  )
}
