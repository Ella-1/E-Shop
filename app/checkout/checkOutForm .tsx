// Import should be "useEffect" instead of "use client"
import React, { useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";
import {
  useElements,
  useStripe,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import { formatPrice } from "@/utils/FormatPrice";
import toast from "react-hot-toast";
import Heading from "../components/products/heading";
import Button from "../components/button";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}) => {
  // Destructure the values properly, and fix the typo "clientSecet" to "clientSecret"
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const formattedPrice = formatPrice(cartTotalAmount);

  // Add a useEffect hook if needed
  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }
    handleSetPaymentSuccess(false);
  }, [stripe]);

  //   constant thatt helps us process the payment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Checkout Payment successfull");
          handleClearCart();
          handleSetPaymentSuccess(true);
          handleSetPaymentIntent(null); // clears all payment and wount allow you create one
        }
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb-6"> 
        <Heading title="Enter your details to complete checkout" />
      </div>
      <h2 className="font-semibold mb-2">
        Addess Information
      </h2>
       <AddressElement options={{mode: 'shipping', allowedCountries:['US', 'KE', 'NG']}}/>
      <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
      <PaymentElement id="payment-element" options={{layout: 'tabs'}} />
        <div className="py-4 text-center text-slate-700 text-xl font-bold">
            Total: {formattedPrice }
        </div>
        <Button label={isLoading? 'Processing' : 'Pay Now'} diasble={isLoading || !elements} onClick={() => {}} />     
    </form>
  );
};

export default CheckoutForm;
