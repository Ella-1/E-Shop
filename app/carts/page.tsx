import React from "react";
import Container from "@/app/components/Container";
import { CartClient } from "./cartClient";
import { GetCurrentUser } from "@/actions/getCurrentUser";

async function Cart() {
  const currentUser = await GetCurrentUser()
  return (
    <div className="pt-8">
      <Container>
        <div>
          <CartClient currentUser={currentUser} />
        </div>
      </Container>
    </div>
  );
}

export default Cart;
