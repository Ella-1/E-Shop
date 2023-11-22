"use client";
import React, { useState } from "react";
import Heading from "../components/products/heading";
import Input from "../components/inputs/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";

// interface LoginFormProps {
//   currentUser: SafeUser | null
// }


const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FieldValues>({});
    const router = useRouter()
  
    const onLogin:SubmitHandler<FieldValues> = (data) => {
      setIsLoading(true)
      signIn('credentials', {
        ...data,
        redirect: false
      }).then((callback) => {
        setIsLoading(false)
        if (callback?.ok) {
          router.push('/carts');
          router.refresh();
          toast.success('Logged In successfully');
        }
        if (callback?.error) {
          toast.error(callback.error);
        }

      })
    }

    // if(currentUser) {
    //   return <p>You Are Logged In. Redirecting...</p>
    // }

  return (
    <>
         <Heading title="Sign In" />
      
      <hr className="bg-slate-300 w-full h-px mt-5 mb-5" />
      <Button onClick={() =>{}}outline label="Continue With Google"  icon={AiOutlineGoogle} />
  
     <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="Password"
      />
     
     
      <Button  label={isLoading? "Loading": "Login"}  onClick={handleSubmit(onLogin)}/>
      <p className="text-sm">Dont't have an Account yet? <Link className="underline" href={'/register'}> Sign Up</Link></p>
    </>
  )
}

export default LoginForm