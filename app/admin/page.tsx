import React from "react";
import Summary from "./summary";
import GetProduct from "@/actions/getProduct";
import GetOrders from "@/actions/getOrders";
import GetUsers from "@/actions/getUser";
import Container from "../components/Container";
import { BarGraph } from "./barGraph";
import { GetGraphData } from "@/actions/getGraphData";

async function Admin() {
  const products = await GetProduct({ category: null });
  const orders = await GetOrders();
  const users = await GetUsers();
  const graphData = await GetGraphData()

  return ( 
    <div className="pt-8">
      <Container>
        <Summary products={products} orders={orders} users={users} />
        
      </Container>
      <div className="mt-4 mx-auto max-w-[1150px]">
        <BarGraph data={graphData}/>
        </div>
    </div>
  );
}

export default Admin;
