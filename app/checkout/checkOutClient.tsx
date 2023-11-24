"use client";
import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import FormWrap from "../components/formWrap";
import { useCart } from "../hooks/useCart";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const router = useRouter();

const CheckOutClient = () => {
  const { paymentIntent, cartProducts, handleSetPaymentIntent } = useCart();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
    console.log("paymentIntent", paymentIntent)

  useEffect(() => {
    // creates payment intent as soon as page loads
    if (cartProducts) {
      setLoading(true);
      setError(false);

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
          toast.error("Something went wrong");
        });
    }
  }, [cartProducts, paymentIntent]);

  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <div>hi Checkout</div>
        </FormWrap>
      </Container>
    </div>
  );
};

export default CheckOutClient;
