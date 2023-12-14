import { products } from "@/utils/products";
import React from "react";
import ProductDetails from "./ProductDetails";
import Container from "@/app/components/Container";
import ListRating from "./listRating";
import getProductById from "@/actions/getProductsById";
import NullData from "@/app/components/nullData";

import { GetCurrentUser } from "@/actions/getCurrentUser";
import { AddRating } from "./addRating";

interface IPrams {
  productId?: string;
}

async function ProductPage({ params }: { params: IPrams }) {
  // const product = products.find(
  //   (item) => item.id.toString() === params.productId
  // );

  const product = await getProductById(params)
  if(!product)  return <NullData title="Opps No Product Found Pls Wait..."/>

  const user = await GetCurrentUser()

  return (
    <div className="p-8">
      <Container>
        <div>
          <ProductDetails product={product} />
        </div>
        <div className="flex flex-col mt-20 gap-4">
         {/* adding rating */}
         
        
         <ListRating product={product} />
         
          <AddRating product={product} user={user} />
       
        </div>
      </Container>
    </div>
  );
}

export default ProductPage;
