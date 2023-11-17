import { product } from "@/utils/product";
import React from "react";
import ProductDetails from "./ProductDetails";
import Container from "@/app/components/Container";
import ListRating from "./listRating";

interface IPrams {
  productId?: string;
}

function ProductPage({ params }: { params: IPrams }) {
  return (
    <div className="p-8">
      <Container>
        <div>
          <ProductDetails  product={product}/>
        </div>
      <div className="flex flex-col mt-20 gap-4">
        <div>Add Rating</div>
        <ListRating product={product}/>
      </div>

      </Container>
    </div>
  );
}

export default ProductPage;
