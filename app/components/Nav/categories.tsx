"use client"
import React from 'react'
import Container from '../Container'
import { Categories } from '@/utils/categories'
import Category from './category'
import { usePathname, useSearchParams } from 'next/navigation'

const CategoriesPage = () => {
    const params = useSearchParams()
    const category = params?.get('category')
    // check if we are at thr main page
    const pathname = usePathname()
    const isMainPage = pathname === '/'
    // not show category if we are not on the main page 
    if(!isMainPage) return null

  return (
    <div className='bg-white'>
        <Container>
            <div className='pt-4 flex  flex-row items-center justify-between overflow-x-auto'>
                {Categories.map((item) => (
                    <div key ={item.label}>
                        <Category 
                        key ={item.label}
                        label={item.label}
                        icon={item.icon}
                        selected={category === item.label || (category === null && item.label === 'All')}
                        />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default CategoriesPage
