"use client"
import React from 'react'
import { CartProductTypes } from '@/app/product/[productId]/ProductDetails'
import exp from 'constants';

interface SetQtyProps {
    cartCounter? : boolean;
    cartProduct: CartProductTypes;
    handleQtyIncrease: () => void;
    handleQtyDecrese: () => void;
}

const btnStyles ='border-[1.2px] border-slate-300 px-2 rounded  '
const SetQuantity: React.FC<SetQtyProps> = ({
    cartProduct, cartCounter , handleQtyDecrese, handleQtyIncrease
}) =>{
  return (
    <div className='flex gap-8 items-center'>
        {cartCounter? null : <div className='font-semibold'>QUANTITY: </div>}
    
    <div className='flex gap-4 items-center text-base'>
    <div className={btnStyles} onClick={handleQtyDecrese}>-</div>
    <div>{cartProduct.quantity}</div>
    <div className={btnStyles} onClick={handleQtyIncrease}>+</div>
 
    </div>
   
    </div>
  )
}

export default SetQuantity;
