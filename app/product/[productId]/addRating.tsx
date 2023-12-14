"use client";
import Button from "@/app/components/button";
import Input from "@/app/components/inputs/input";
import Heading from "@/app/components/products/heading";
import { SafeUser } from "@/types";
import { Rating } from "@mui/material";
import { Order, Product, Review } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AddRatingProps {
  product?: Product & {
    reviews: Review[];
  };
  user?:
    | (SafeUser & {
        orders: Order[];
      })
    | null;
}

export const AddRating: React.FC<AddRatingProps> = ({ product, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const setConstantValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if(data.rating === 0) {
      setIsLoading(false)  
      return toast.error("No Rating Selected")
    }
    // get the information of the person making the review
    const ratingData = {...data, userId: user?.id, product: product}
    axios.post('/api/review', ratingData).then(()=> {
      toast.success('Rating Submited Successfully!')
    }).catch((error) => {
      toast.error("Somthing Went Wrong")
    }).finally(()=> {
      setIsLoading(false)
    })
  };

  if(!user || !product) return null

  const deliveredOrder = user?.orders.some(order=> order.products.find(item => item.id === product.id && order.deliveryStatus === 'delivered'))
  const userReview = product?.reviews.find(((review: Review) => {
      return review.userId === user.id
  }))

  if(!userReview || !deliveredOrder) return null


  return (
    <div className="flex flex-col gap-2  mt-10 max-w-[500px]">
      <Heading title="Rate This Product" />
    
      <Rating
        onChange={(event, newValue) => {
          setConstantValue("rating", newValue);
        }}
      />

      <Input
        id="comment"
        label="comment"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Button label={isLoading ? "Loading" : "Rate Product"} onClick={handleSubmit(onSubmit)}/>
    </div>
  );
};
