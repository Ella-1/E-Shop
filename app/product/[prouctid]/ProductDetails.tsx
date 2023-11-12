"use client"
import { Rating } from '@mui/material';
import React from 'react'
interface  ProductDetailsProps {
    product:any 
}

const  ProductDetails: React.FC<ProductDetailsProps> = ({product}) =>{
  
    const productRating = product.reviews.reduce((acc: number, review: any) => {
        return acc + review.rating;
    }, 0) /product.reviews.length;
    return (
    <div className='grid grid-cols-1 md:grid-cols-2' >
        <div>Images</div>
        <div>
            <h2 className='text-3xl font-medium text-slate-700'>{product.name}</h2>
            <div>
                <Rating value={productRating} readOnly/>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails