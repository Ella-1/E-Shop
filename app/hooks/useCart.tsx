import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CartProductTypes } from "../product/[productId]/ProductDetails";
import toast from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number;
  cartProducts: CartProductTypes[] | null;
  handleAddProductToCart: (product: CartProductTypes) => void;
  handleRemoveProductFromCart: (product: CartProductTypes) => void;
  handleCartQtyIncrease: (product: CartProductTypes) => void;
  handleCartQtyDecrease: (product: CartProductTypes) => void;
  handleClearCart: () => void;
  cartTotalAmount: number;
  paymentIntent: string | null;
  handleSetPaymentIntent: (val: string | null) => void;
};

export const CartContex = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartProducts, setCartProduct] = useState<CartProductTypes[] | null>(
    null
  );
  const [cartTotalAmount,setCartTotalAmount ] = useState(0)
  const [paymentIntent, setPaymentIntent] = useState<string | null> (null)

  // The hook that adds a product to the cart and local storage
  useEffect(() => {
    const cartItems: any = localStorage.getItem("Ecommerce");
    const cProducts: CartProductTypes[] | null = JSON.parse(cartItems);
    const eshopPaymentIntent: any = localStorage.getItem('eshopPaymentIntent')
    // once we have the payment intent we updae our state
    const paymentIntent: string| null = JSON.parse(eshopPaymentIntent)
    

    setCartProduct(cProducts);
    setPaymentIntent(paymentIntent)
  }, []);

  // getting the total price
  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;
            acc.total += itemTotal;
            acc.qty += item.quantity;

            return acc;
          },
          {
            total: 0,
            qty: 0, // the default values we passed here is called our accumulator
          }
        );
        setCartTotalQty(qty)
        setCartTotalAmount(total)
      }
    };
    getTotals()
  }, [cartProducts]);

  const handleCartQtyIncrease = useCallback(
    (product: CartProductTypes) => {
      if (product.quantity === 99) {
        return toast.error("Oops! Maximum reached");
      }

      if (cartProducts) {
        // Create a copy of the cartProducts array
        const updatedCart = [...cartProducts];

        const existingIndex = updatedCart.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          // Create a copy of the product to avoid mutating the state directly
          const updatedProduct = { ...updatedCart[existingIndex] };

          // Increment the quantity
          updatedProduct.quantity = updatedProduct.quantity + 1;

          // Update the product in the cart array
          updatedCart[existingIndex] = updatedProduct;

          // Update the state with the modified cart
          setCartProduct(updatedCart);
          localStorage.setItem("Ecommerce", JSON.stringify(updatedCart));
          return updatedCart;
        }
      }
    },
    [cartProducts]
  );

  const handleCartQtyDecrease = useCallback(
    (product: CartProductTypes) => {
      if (product.quantity === 1) {
        return toast.error("Oops! Minimum reached");
      }

      if (cartProducts) {
        // Create a copy of the cartProducts array
        const updatedCart = [...cartProducts];

        const existingIndex = updatedCart.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          // Create a copy of the product to avoid mutating the state directly
          const updatedProduct = { ...updatedCart[existingIndex] };

          // Increment the quantity
          updatedProduct.quantity = updatedProduct.quantity - 1;

          // Update the product in the cart array
          updatedCart[existingIndex] = updatedProduct;

          // Update the state with the modified cart
          setCartProduct(updatedCart);
          localStorage.setItem("Ecommerce", JSON.stringify(updatedCart));
          return updatedCart;
        }
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProduct(null);
    setCartTotalQty(0);
    localStorage.setItem("Ecommerce", JSON.stringify(null));
  }, [cartProducts]);

  const handleAddProductToCart = useCallback((product: CartProductTypes) => {
    setCartProduct((prev) => {
      let updatedCart;
      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }

      toast.success("Product Added to Cart");
      localStorage.setItem("Ecommerce", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductTypes) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter((item) => {
          return item.id !== product.id;
        });
        setCartProduct(filteredProducts);
        toast.success("Product Removed");
        localStorage.setItem("Ecommerce", JSON.stringify(filteredProducts));
      }
    },
    [cartProducts]
  );

  // function that helps us add that local intent to our storage
  const handleSetPaymentIntent = useCallback((val: string | null) => {
    setPaymentIntent(val);
    localStorage.setItem('eshopPaymentIntent', JSON.stringify(val))
  }, [paymentIntent])

  const value = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
    cartTotalAmount,
    paymentIntent,
    handleSetPaymentIntent
  };
  return <CartContex.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContex);
  if (context === null) {
    throw new Error("useCart must be used within a CartContexProvider");
  }

  return context;
};
