import { products } from "@/utils/products";
import React from "react";
import ProductDetails from "./ProductDetails";
import Container from "@/app/components/Container";
import ListRating from "./listRating";
import getProductById from "@/actions/getProductsById";
import NullData from "@/app/components/nullData";

interface IPrams {
  productId?: string;
}

async function ProductPage({ params }: { params: IPrams }) {
  // const product = products.find(
  //   (item) => item.id.toString() === params.productId
  // );

  const product = await getProductById(params)
  if(!product)  return <NullData title="Opps No Product Found Pls Wait..."/>

  return (
    <div className="p-8">
      <Container>
        <div>
          <ProductDetails product={product} />
        </div>
        <div className="flex flex-col mt-20 gap-4">
          <div>Add Rating</div>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
}

export default ProductPage;
