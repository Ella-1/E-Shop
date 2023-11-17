import React from "react";
import Container from "@/app/components/Container";
import { CartClient } from "./cartClient";

function Cart() {
  return (
    <div className="pt-8">
      <Container>
        <div>
          <CartClient />
        </div>
      </Container>
    </div>
  );
}

export default Cart;
