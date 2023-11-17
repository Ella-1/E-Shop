"use client";
import React from "react";
import { CartProductTypes } from "../product/[productId]/ProductDetails";
import { formatPrice } from "@/utils/FormatPrice";
import Link from "next/link";
import { Truncate } from "@/utils/truncateTex";
import Image from "next/image";
import SetQuantity from "../components/products/setQuantity";
import { useCart } from "../hooks/useCart";


interface ItemContentProps {
  item: CartProductTypes;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const {handleRemoveProductFromCart,handleCartQtyIncrease, handleCartQtyDecrease  } = useCart()
  
    return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-[1.5px] border-slate-200 items-center ">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[70px] aspect-square mt-2">
            <Image
              src={item.selectedImg.image}
              fill
              alt={item.name}
              className="object-contain"
            />
          </div>
        </Link>

        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`}>{Truncate(item.name)}</Link>
          <div>{item.selectedImg.color}</div>
          <div className="w-[70px]">
            <button className="text-slate-500 underline" onClick={() => {handleRemoveProductFromCart(item)}}>
              remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center">
        <SetQuantity  cartCounter={true} cartProduct={item} handleQtyIncrease={()=> {handleCartQtyIncrease(item)}} handleQtyDecrese={() => { handleCartQtyDecrease(item)}}  />

      </div>
      <div className="justify-self-end font-semibold">{formatPrice(item.price * item.quantity)}</div>
      
    </div>
  );
};

export default ItemContent;
