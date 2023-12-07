import React from "react";

import FormWrap from "@/app/components/formWrap";
import { GetCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/nullData";
import GetOrders from "@/actions/getOrders";
import Container from "@/app/components/Container";

import GetOrdersByUserId from "@/actions/getOrderByUserId";
import OrdersClient from "./ordersCient";

export default async function ManageOrders() {
   
  const currentUser = await GetCurrentUser();
  if (!currentUser) {
    return <NullData title="Oops! Access denied" />;
  }

  const orders = await GetOrdersByUserId(currentUser.id)
  if (!orders) {
    return <NullData title="No Orders Yet..." />;
  }
  return (
    <div className="p-8" >
      <Container>
        <OrdersClient orders={orders} />
      </Container>
    </div>
  );
}
