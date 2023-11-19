"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/hooks/useCart";
import { CiShoppingCart } from "react-icons/ci";

export const CartCount = () => {
  const { cartTotalQty } = useCart();
  const router = useRouter();
  return (
    <div
      className="relative cursor-pointer"
      onClick={() => router.push("/carts")}
    >
      <div className="text-3xl">
        <CiShoppingCart />
      </div>
      <span className="absolute top-[-10px] right-[-10px] bg-slate-700 text-white h-6 w-6 flex rounded-full justify-center text-sm" >{cartTotalQty}</span>
    </div>
  );
};
