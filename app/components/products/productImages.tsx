"use client"
import { CartProductTypes, selectedImgType } from '@/app/product/[prouctid]/ProductDetails'
import React from 'react'
import Image from 'next/image'

interface ProductImageProps{
    cartProduct: CartProductTypes,
    product: any,
    handleColorSelect: (value: selectedImgType) => void; 
}

const ProductImages: React.FC<ProductImageProps> = ({
    cartProduct, product, handleColorSelect
}) => {
  return (
    <div className='grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]'>
        {/* SMALLER IMAGE */}
        <div className='flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h'>
            {product.images.map( (image: selectedImgType)=> {
                return (
                    <div key={image.color}  className={`relative w-[80%] aspect-square rounded border ${cartProduct.selectedImg.color == image.color ? 'border-[1.5px' : 'border-none'} `} onClick={() => handleColorSelect(image)}>
                        <Image src={image.image}  fill alt={image.color} className='object-contain' />
                    </div>
                )
            })}
        </div>

        {/* BIGGER IMAGE */}
        <div className='col-span-5 relative aspect-square'>
            <Image
            fill
            src={cartProduct.selectedImg.image}
            alt={cartProduct.name}
            className='w-full object-contain max-h-[500px] min-h-[500px] sm:min-h-[400px]'
        
            />
        </div>
    </div>
  )
}

export default ProductImages