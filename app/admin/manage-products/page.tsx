import React from "react";
import GetProduct from "@/actions/getProduct";
import { GetCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/nullData";
import Container from "@/app/components/Container";
import ManageProductClient from "./manageProductClient";

export default async function ManageProduct() {
  const products = await GetProduct({ category: null });
  const currentUser = await GetCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access denied" />;
  }

  return (
    <div className="pt-8">
      <Container>
       <ManageProductClient products={products}/>
      </Container>
    </div>
  );
}
