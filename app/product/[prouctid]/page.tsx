import { product } from "@/utils/product";
import React from "react";
import ProductDetails from "./ProductDetails";
import Container from "@/app/components/Container";

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
      </Container>
    </div>
  );
}

export default ProductPage;
