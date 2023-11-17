"use client";
import { Rating } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import SetColors from "@/app/components/products/setColors";
import SetQuantity from "@/app/components/products/setQuantity";
import Button from "@/app/components/button";
import ProductImages from "@/app/components/products/productImages";
import { useCart } from "@/app/hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";

// PRODUCT TYPES
interface ProductDetailsProps {
  product: any;
}

// CART TYPES
export type CartProductTypes = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: selectedImgType;
  quantity: number;
  price: number;
};

// IMAGE TYPES IN RELATION TO CART
export type selectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

// FUNCTION FOR PRODUCT DETAIL
const  ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductTypes>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });

  const router = useRouter()

  // console.log(cartProduct)
  // A FUNCTION THAT MEMORISE AND UPDATE ITSELF BASE ON DATA PASSES
  const handleQtyIncrease = useCallback(() => {
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, [cartProduct]);

  const handleQtyDecrease = useCallback(() => {
    setCartProduct((prev) => {
      // Ensure the quantity doesn't go below 1
      const newQuantity = prev.quantity - 1 > 0 ? prev.quantity - 1 : 1;
      return { ...prev, quantity: newQuantity };
    });
  }, [cartProduct]);

  const handColorSelect = useCallback(
    (value: selectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );

  // function for breaking lines
  const Horizontal = () => {
    return <hr className="w-[30%] my-3" />;
  };
  //   product rating algorithm
  const productRating =
    product.reviews.reduce((acc: number, review: any) => {
      return acc + review.rating;
    }, 0) / product.reviews.length;

  // use Effect acceps dependancy array
  useEffect(() => {
    setProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex > -1) {
        setProductInCart(true);
      }
    }
  }, [cartProducts]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <ProductImages
          cartProduct={cartProduct}
          product={product}
          handleColorSelect={handColorSelect}
        />
      </div>

      {/* DETAILS COMPONENT  */}
      <div>
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2 font-medium text-slate-500">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />

        <div>
          <span className="font-semibold">CATEGOTY: </span>
          <span>{product.category}</span>
        </div>

        <div>
          <span className="font-semibold">BRAND: </span>
          <span>{product.brand}</span>
        </div>

        <div
          className={
            product.inStock ? "text-teal-400 m-auto" : "text-rose-400 m-auto"
          }
        >
          {" "}
          {product.inStock ? "In Stock" : "Out of stock"}
        </div>

        <Horizontal />

        {isProductInCart ? (
          <>
            {/* IF CART IS ALREADY ADDED */}
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle size={20} className="text-teal-200" />
              <span>Product added to cart</span>
            </p>
            
            <div className="max-w-[300px]">
            <Button
                label="View Cart"
                outline
                onClick={() => {
                  router.push('/carts')
                }}
              />
            </div>
          </>
        ) : (
          <>
            {/* IF CART IS NOT ADDED */}
            <SetColors
              handColorSelect={handColorSelect}
              cartProduct={cartProduct}
              images={product.images}
            />
            <Horizontal />
            <div>QUANTITY: </div>
            <Horizontal />
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyIncrease={handleQtyIncrease}
              handleQtyDecrese={handleQtyDecrease}
            />
            <div className="max-w-[300px] mt-5">
              <Button
                label="Add To Cart"
                onClick={() => {
                  handleAddProductToCart(cartProduct);
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
