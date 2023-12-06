import React from "react";

import FormWrap from "@/app/components/formWrap";
import { GetCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/nullData";
import ManageOrdersClient from "./manageOrdersClient";
import GetOrders from "@/actions/getOrders";
import Container from "@/app/components/Container";

export default async function ManageOrders() {
  const orders = await GetOrders();
  const currentUser = await GetCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access denied" />;
  }
  return (
    <div className="p-8" >
      <Container>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  );
}
