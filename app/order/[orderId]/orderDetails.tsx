"use client";
import Heading from "@/app/components/products/heading";
import { Status } from "@/app/components/status";
import { formatPrice } from "@/utils/FormatPrice";
import { Order } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
interface OrderDetailsProps {
  order: Order;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  const router = useRouter();

  return (
    <div className="max-w-[1150px] m-auto flex flx-col gap-2">
      <div>
        <Heading title="Order Details" />
      </div>
      <div>Order ID: {order.id}</div>

      <div>
        Total Amount:{" "}
        <span className="font-bold ">{formatPrice(order.amount)}</span>
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
          ) : order.deliveryStatus === "complete" ? (
            <Status
              text="completed"
              icon={MdDeliveryDining}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
