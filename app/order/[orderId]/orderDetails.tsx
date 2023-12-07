"use client";
import Heading from "@/app/components/products/heading";
import { Status } from "@/app/components/status";
import { formatPrice } from "@/utils/FormatPrice";
import { Order } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/navigation";
import React from "react";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import { OrderItem } from "./orderItem";
interface OrderDetailsProps {
  order: Order;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  const router = useRouter();

  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2">
      <div>
        <Heading title="Order Details" />
      </div>
      <div>Order ID: {order.id}</div>

      <div>
        Total Amount:{" "}
        <span className="font-bold ">{formatPrice(order.amount/100)}</span>
      </div>

      <div className="flex gap-2 items-center">
        <div>Payment Status</div>
        <div>
          {order.status === "pending" ? (
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.status === "complete" ? (
            <Status
              text="completed"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div>Delivery Status</div>
        <div>
          {order.deliveryStatus === "pending" ? (
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.deliveryStatus === "dispatched" ? (
            <Status
              text="dispatched"
              icon={MdDeliveryDining}
              bg="bg-purple-200"
              color="text-purple-700"
            />
          ) : order.deliveryStatus === "complete" ? (
            <Status
              text="completed"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>

      <div>Date: {moment(order.createdDate).fromNow()} </div>
      <h2 className="font-semibold mt-4 mb-2">Products Ordered</h2>
      <div className="grid grid-cols-5 text-xs gap-4 pb-2 item-center">
        <div className="col-span-2 justify-self-start">PRODUCT</div>

        <div className="justify-self-center">Price</div>
        <div className="justify-self-center">Qty</div>
        <div className="justify-self-end">Total</div>
      
      
      </div>
      {order.products && order.products.map((item) => {
        return <OrderItem key={item.id} item={item}></OrderItem>
      })}
    </div>
  );
};
