import React from "react";
import CheckOutClient from "./checkOutClient";
import FormWrap from "../components/formWrap";
import Container from "../components/Container";

export default async function CheckOut() {
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <CheckOutClient />
        </FormWrap>
      </Container>
    </div>
  );
}
