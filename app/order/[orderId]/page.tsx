
import Container from "@/app/components/Container";
import { OrderDetails } from "./OrderDetails";
import GetOrderById from "@/actions/getOrderBtId";
import NullData from "@/app/components/nullData";


interface IPrams {
  orderId?: string; 
}

async function OrderPage({ params }: { params: IPrams }) {
  const order = await GetOrderById(params)
  if(!order) {
    return <NullData title="No Order" ></NullData>
  }

  return (
    <div className="p-8">  
      <Container>
        <div>
          <OrderDetails order={order} />
        </div>
        <div className="flex flex-col mt-20 gap-4">
          <div>Add Rating</div>
         
        </div>
      </Container>
    </div>
  );
}

export default OrderPage;
