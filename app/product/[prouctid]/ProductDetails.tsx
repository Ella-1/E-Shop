"use client";
import { Rating } from "@mui/material";
import React, { useState } from "react";

interface ProductDetailsProps {
  product: any,
}

export type CartProduct = {
  id: string,
  name: string,
  description: string,
  category: string,
  brand: string;
  selectedImg: selectedImgType,
  quantity: number,
  price: number,
};

export type selectedImgType = {
  color: string,
  colorCode: string,
  image: string,
};
const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  
    const [cartProduct, setCartProduct] = useState<CartProduct>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImg: { ...product.images[0] },
        quantity: 1,
        price: product.price,
      });
    
  
    // function for breaking lines
  const Horizontal = () => {
    return <hr className="w-[30%] my-3" />;
  };
  //   product rating algorithm
  const productRating =
    product.reviews.reduce((acc: number, review: any) => {
      return acc + review.rating;
    }, 0) / product.reviews.length;
  
  
    return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>Images</div>
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
        <div>
          <span className="font-semibold">Colors: </span>
        </div>
        <Horizontal />
        <div>QUANTITY: </div>
        <Horizontal />
        <div>Add To Cart</div>
      </div>
    </div>
  );
};

export default ProductDetails;
