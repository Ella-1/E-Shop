"use client";
import React from "react";
import { CartContextProvider } from "../hooks/useCart";

interface CartProviderProp {
    children: React.ReactNode;
}

export const CartProviders: React.FC<CartProviderProp> = ({ children}) => {
  return <CartContextProvider>{children}</CartContextProvider>;
};
