"use client";
import React, { useState } from "react";
import Heading from "../components/products/heading";
import Input from "../components/inputs/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({});

  return (
    <>
      <Heading title="Sign Up" />

      <hr className="bg-slate-300 w-full h-px mt-5 mb-5" />

     <div className="mt-8 mb-5">
     <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
     </div>
     <div className="mt-8 mb-5">
     <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
     </div>
      <div className="mt-8 mb-5">
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="Password"
      />
      </div>
    </>
  );
};

export default RegisterForm;
