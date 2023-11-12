import React from 'react'
import Image from 'next/image';
import { Truncate } from '@/utils/truncateTex';
import { formatPrice } from '@/utils/FormatPrice';
import { Rating } from '@mui/material';

interface ProductCardsProps {
    data:any;
}

const ProductCards: React.FC<ProductCardsProps> = ({data}) => {
  
    const productRating = data.reviews.reduce((acc: number, review: any) => {
        return acc + review.rating;
    }, 0) / data.reviews.length;
    
    return (
    <div className='col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm transition hover:scale-105 text-center text-sm'>
        <div className='flex flex-col items-center w-full gap-1'>
            <div className='aspect-square overflow-hidden relative w-full'>
                <Image 
                fill
                src={data.images[0].image}
                alt={data.name}
                className='w-full h-full object-contain'
                />
            </div>

            <div className='mt-4'>{Truncate(data.name)}</div>
            <div><Rating  value={productRating} readOnly/></div>
            <div>{data.reviews.length} Reviews</div>
            <div className='font-semibold'>{formatPrice(data.price)}</div>
        </div>
    </div>
  )
}

export default ProductCards