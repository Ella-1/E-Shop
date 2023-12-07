import Container from "@/app/components/Container";

import GetOrderById from "@/actions/getOrderById";
import NullData from "@/app/components/nullData";
import { OrderDetails } from "./orderDetails";

interface IPrams {
  orderId?: string;
}

async function OrderPage({ params }: { params: IPrams }) {
  const order = await GetOrderById(params);
  if (!order) {
    return <NullData title="No Order"></NullData>;
  }

  return (
    <div className="p-8">
      <Container>
        <div>
          <OrderDetails order={order} />
        </div>
      </Container>
    </div>
  );
}

export default OrderPage;
