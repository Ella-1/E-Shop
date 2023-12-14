"use client";

import { Order, Product, User } from "@prisma/client";
import { useEffect, useState } from "react";
import Heading from "../components/products/heading";
import { formatPrice } from "@/utils/FormatPrice";
import { formatNumber } from "@/utils/formatNumber";

interface SummaryProps {
  orders?: Order[];
  products?: Product[];
  users?: User[];
}

type SummaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
  };
};

const Summary: React.FC<SummaryProps> = ({ products, orders, users }) => {
  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    sale: {
      label: "Total Sale",
      digit: 0,
    },
    products: {
      label: "Total Product",
      digit: 0,
    },
    orders: {
      label: "Total Order",
      digit: 0,
    },
    paidOrders: {
      label: "Paid Orders",
      digit: 0,
    },
    unPaidOrders: {
      label: "Unpaid Orders",
      digit: 0,
    },
    users: {
      label: "Total Users",
      digit: 0,
    },
  });

  //   update data when the page loads
  useEffect(() => {
    setSummaryData((prev) => {
      let tempData = { ...prev };
      const totalSale = (orders ?? []).reduce((acc, item) => {
        if (item.status === "complete") {
          return acc + item.amount;
        } else return acc; // handle the case where the condition is not met
      }, 0); // provide an initial value for the reduce function
      //   nullish collencing operator
      const paidOrders = (orders ?? []).filter((order) => {
        return order.status === "complete";
      });

      const unpaidOrders = (orders ?? []).filter((order) => {
        return order.status === "pending";
      });

      tempData.sale.digit = totalSale;
      tempData.orders.digit = (orders ?? []).length;
      tempData.paidOrders.digit = paidOrders.length;
      tempData.unpaidOrders = tempData.unpaidOrders || {
        label: "Unpaid Orders",
        digit: 0,
      };
      tempData.unpaidOrders.digit = unpaidOrders.length;

      tempData.products.digit = (products ?? []).length;
      tempData.users.digit = (users ?? []).length;

      return tempData;
    });
  }, [orders, products, users]);


  const summaryKeys = Object.keys(summaryData)

  return (
    <div className="max-w-[1150px] m-auto">
      <div className="mb-4 mt-8">
        <Heading title="Stats" center />
      </div>
      <div>
        <div className="grid grid-cols-2 gap-3 max-h-[50hv] overflow">
{
    summaryKeys && summaryKeys.map((key)=> {
        return <div key={key} className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition " >
            <div className="text-xl md:text-4xl font-bold">
                {
                    summaryData[key].label === 'Total Sale'? <>{formatPrice( summaryData[key].digit)}</> : <>{formatNumber(summaryData[key].digit)}</>
                }
            </div>
            <div>{summaryData[key].label}</div>
        </div>
    })
}
        </div>
      </div>
    </div>
  );
};

export default Summary;
