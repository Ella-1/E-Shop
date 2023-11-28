import Container from "@/app/components/Container";
import React from "react";
import AddProductForm from "./addProductForm";
import FormWrap from "@/app/components/formWrap";
import { GetCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/nullData";

export default async function AddProducts() {
  const currentUser = await GetCurrentUser()
  if (!currentUser || currentUser.role !== "ADMIN"){
    return <NullData title="Oops! Access denied"/>
  }
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </Container>
    </div>
  );
}
