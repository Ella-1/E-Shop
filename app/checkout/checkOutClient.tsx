"use client";
import React, { useCallback, useEffect, useState } from "react";
import Container from "../components/Container";
import FormWrap from "../components/formWrap";
import { useCart } from "../hooks/useCart";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkOutForm ";
import Button from "../components/button";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLEKEY as string)

const CheckOutClient = () => {
  const { paymentIntent, cartProducts, handleSetPaymentIntent } = useCart();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const  [paymentSuccess, setPaymentSuccess] =  useState(false)
  
  console.log("paymentIntent", paymentIntent); // Remove or replace
  console.log("clientSecet", clientSecret); // Remove or replace
  

  const router = useRouter();
  useEffect(() => {
    // creates payment intent as soon as page loads
    if (cartProducts) {
      setLoading(true);
      setError(false);
    //   axios.post("/api/CreatePayment",{cartProducts,  paymentIntent} )

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 401) {
            router.push("/login");
          }
          return res.json();
        })

        .then((data) => {
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymentIntent(data.paymentIntent.id); // store info in local storage
        })
        .catch((error) => {
          setError(true);
          setLoading(false); // Add this line
          toast.error("Something went wrong");
        });
    }
  }, [cartProducts, paymentIntent]);

  const options: StripeElementsOptions = {
     clientSecret,
     appearance: {
        theme: "stripe",
        labels: 'floating'
     }
  }

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value)
  }, [])

  return (
    <div className="w-full">
            {clientSecret &&  cartProducts &&(
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm  clientSecret={clientSecret} handleSetPaymentSuccess={handleSetPaymentSuccess}/>
        </Elements>
      )}
      {loading && <div className="text-center">Loading Checkout</div>}
      {error && <div className="text-center text-rose-500">Something went Wrong...</div>}
      {paymentSuccess && (
        <div className="flex items-center flex-col gap-4">
            <div className="text-teal-500 text-center">Payment Successful</div>
            <div className="max-w-[230px] w-full">
                <Button label="View Your orders" onClick={() => {router.push('/order')}} />
            </div>
        </div>
      )}
    </div>
  );
};

export default CheckOutClient;
