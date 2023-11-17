"use client";
import React from "react";
import { useCart } from "../hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/products/heading";
import Button from "../components/button";
import ItemContent from "./itemContent";

export const CartClient = () => {
  const { cartProducts, handleClearCart } = useCart();
  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Your cart is empty</div>
        <div>
          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack />
            <span>Start Shoping</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Heading title="Shoping Cart" center />
      <div className=" mt-8 grid grid-cols-5 text-xs gap-4 pb-2 it ems-center">
        <div className="col-span-2 justify-self-start">PRODUCT</div>
        <div className="justify-self-center">PRICE</div>
        <div className="justify-self-center">QUANTITY</div>
        <div className="justify-self-end ">TOTAL</div>
      </div>

      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <div >
                <ItemContent key={item.id} item={item}/>
            </div>;
          })}
      </div>
      <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between">
        <div className="w-[300px]">
          <Button label="Clear Cart" onClick={() => {handleClearCart()}} outline />
        </div>

        <div className="text-sm flex flex-col gap-1 items-start">
            <div className="flex justify-between w-full text-base font-semibold">
            <span>Subtotal</span>
            <span>$1000</span>
            </div>
            <p className="text-slate-500">Taxes and shipping calculate at checkout </p>
          <Button label="Chekout" onClick={() => {}} />
          <Link
          href={"/"}
          className="text-slate-500 flex items-center gap-1 mt-2"
          >
             <MdArrowBack />
             <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
