"use client";
import React, { useState } from "react";
import Heading from "../components/products/heading";
import Input from "../components/inputs/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({});

  const onSubmit:SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    console.log(data) 
  }

  return (
    <>
      <Heading title="Sign Up" />
      
      <hr className="bg-slate-300 w-full h-px mt-5 mb-5" />
    <Button onClick={() =>{}}outline label="Sign up With Google"  icon={AiOutlineGoogle} />
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
      <Button  label={isLoading? "Loading": "Sign In"}  onClick={handleSubmit(onSubmit)}/>
      <p className="text-sm mt-2">Already have an account? <Link className="underline" href={'/login'}> Login</Link></p>
    </>
  );
};

export default RegisterForm;
