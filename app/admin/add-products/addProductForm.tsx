"use client";

import CustomCheckBox from "@/app/components/inputs/customCheckBox";
import Input from "@/app/components/inputs/input";
import TextArea from "@/app/components/inputs/textArea";
import Heading from "@/app/components/products/heading";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export default function AddProductForm() {
  const [isLoading, setIsloading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
      price: "",
    },
  });

  return (
    <>
      <Heading title="Add a Product" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="Price"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="number"
      />
      <Input
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    
    <TextArea 
    id="description"
    label="Description"
    disabled={isLoading}
    register={register}
    errors={errors}
    required
    />
    <CustomCheckBox id="inStock" register={register} label="This product is in Stock" />
    
    <div className="w-full font-medium">
      <div className="mb-2 font-semibold">Select a Category</div>
    <div className="grid grid-cols-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto">
      {}
    </div>
    </div>
    </>
  );
}
