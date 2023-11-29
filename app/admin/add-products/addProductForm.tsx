"use client";

import Button from "@/app/components/button";
import { CategoryInput } from "@/app/components/inputs/categoryInput";
import CustomCheckBox from "@/app/components/inputs/customCheckBox";
import Input from "@/app/components/inputs/input";
import { SelectColor } from "@/app/components/inputs/selectColor";
import { SelectImage } from "@/app/components/inputs/selectImage";
import TextArea from "@/app/components/inputs/textArea";
import Heading from "@/app/components/products/heading";
import { Categories } from "@/utils/categories";
import { Colors } from "@/utils/colors";
import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export type ImageType ={
  color: string;
  colorCode: string;
  image: File | null
}
export type UploadedImageType ={
  color: string;
  colorCode: string;
  image: string
}



export default function AddProductForm() {
  const [isLoading, setIsloading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>();
  const [isProductCreated, setIsProductCreated] = useState(false)

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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // uploads image to firebase
    //save product to mongo db
  }

  const category = watch("category");
  const setConstantValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    }); // update the categoray on click
  };

  // get the value of our images
  useEffect(()=>{
    setConstantValue('images', images)
  },[images]);

  // clear images if product is created
  useEffect(() => {
    if(isProductCreated){
      reset();
      setImages(null)
      setIsProductCreated(false)
    }
  }, [isProductCreated])

  const addImageToState = useCallback((value: ImageType)=> {
    setImages((prev) => {
      if(!prev) {
        return [value]
      }
      return [...prev, value]
    })
  }, [])
  const removeImageFromState = useCallback((value: ImageType)=> {
    setImages((prev) => {
      if(prev){
        const filteredImage = prev?.filter((item )=> item.color !== value.color);
        return filteredImage
      }
      return prev
    })
    
  }, [])
  console.log('images>>>', images)

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
      <CustomCheckBox
        id="inStock"
        register={register}
        label="This product is in Stock"
      />

      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select a Category</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
          {Categories.map((item) => {
            if (item.label === "All") {
              return null;
            }
            // set a key from the onclick function
            return (
              <div key={item.label} className="col-span">
                <CategoryInput
                  onClick={(category) =>
                    setConstantValue("category", category)
                  }
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full flex flex-col flex-wrap gap-4">
        <div>
          <div className="font-bold">Select the available product colors and upload their images</div>
          <div className="text-sm">
            You must upload an image for each of the colors selected otherwise your color selection will be ignored
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {Colors.map((item,index) =>{
            return <SelectColor key={index} item={item} addImageToState={addImageToState} removeImageFromState={removeImageFromState}  isProductCreated={isProductCreated}/>
          })}
        </div>
      </div>
     <Button  label={isLoading ? 'Loading...' : 'Add Product'} onClick={handleSubmit(onSubmit)}/>
    </>
  );
}
