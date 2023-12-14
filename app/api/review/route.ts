import { GetCurrentUser } from "@/actions/getCurrentUser";
import { Review } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    const currentUser = await GetCurrentUser();

    if(!currentUser) {
        return NextResponse.error()
    }

    const body = await request.json();
    const {comment, rating,product,userId} = body;

    // checks if that particular product is available for us
    const deliveredOrder = currentUser?.orders.some(order=> order.products.find(item => item.id === product.id && order.deliveryStatus === 'delivered'))
    const userReview = product?.reviews.find(((review: Review) => {
        return review.userId === currentUser.id
    }))

    // if(!userReview || !deliveredOrder){
    //     return NextResponse.error()
    // }

    const review = await prisma?.review.create({
        data:{
            comment,
            rating,
            productId: product.id,
            userId
        }
    })
    return NextResponse.json(review)


}