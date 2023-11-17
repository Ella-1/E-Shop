import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CartProductTypes } from "../product/[prouctid]/ProductDetails";
import toast from "react-hot-toast";


type CartContextType = {
    cartTotalQty: number,
    cartProducts: CartProductTypes[] | null
    handleAddProductToCart: (product: CartProductTypes) => void;
}

export const CartContex = createContext <CartContextType | null>(null);

interface Props {
    [propName: string] : any;
}

export const CartContextProvider = (props: Props) => {
const [ cartTotalQty,  setCartTotalQty] = useState(0)
const [cartProducts, setCartProduct] = useState<CartProductTypes[] | null >(null);


useEffect (() => {
    const cartItems: any = localStorage.getItem('Ecommerce')
    const cProducts: CartProductTypes[] | null = JSON.parse(cartItems)
    setCartProduct(cProducts)
},[])

const handleAddProductToCart = useCallback((product:CartProductTypes) => {
    setCartProduct((prev) => {
        let updatedCart;
        if(prev) {
            updatedCart = [...prev, product]
        } else {
            updatedCart = [product]
        }

        toast.success('Product Added to Cart')
        localStorage.setItem("Ecommerce", JSON.stringify(updatedCart))
        return updatedCart
    })
}, [])

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart
    }
    return <CartContex.Provider value={value} {...props}/>
}

export const useCart = () => {
    const context = useContext(CartContex);
    if( context ===  null) {
        throw new Error("useCart must be used within a CartContexProvider")
    }

    return context
}