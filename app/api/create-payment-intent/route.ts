import Stripe from "stripe";
import prisma from '@/libs/prismadb'
import { NextResponse, NextRequest } from "next/server";
import { CartProductTypes } from "@/app/product/[productId]/ProductDetails";
import { GetCurrentUser } from "@/actions/getCurrentUser";
import { error } from "console";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16"
})

const calculateOrderAmount = (items: CartProductTypes[]) => {
    const totalPrice = items.reduce((acc, item) => {
        const itemTotal = item.price * item.quantity;

        return acc + itemTotal;

    }, 0)
    return totalPrice
}
export async function POST(request: NextRequest) {
    const currrentUser = await GetCurrentUser();
    // throw error if user doesn't exist
    if (!currrentUser) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { items, payment_intent_id } = body;
    const total = calculateOrderAmount(items) * 100; // multiplying by 100 because stripe takes amount in cent
    const orderData = {
        user: { connect: { id: currrentUser.id } },
        amount: total,
        currency: 'usd',
        status: 'pending',
        deliveryStatus: 'pending',
        paymentIntentId: payment_intent_id,
        products: items,
    };

    if (payment_intent_id) {
        // update order
        // we update only the total amount
        const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

        if (current_intent) {
            const update_intent = await stripe.paymentIntents.update(payment_intent_id, { amount: total });

            // update order
            const [existing_order, update_order] = await Promise.all([
                prisma.order.findFirst({
                    where: { paymentIntentId: payment_intent_id } as any,
                }),
                prisma.order.update({
                    where: { paymentIntentId: payment_intent_id } as any,
                    data: {
                        amount: total,
                        products: items,
                    },
                }),
            ]);

            if (!existing_order) {
                return NextResponse.json({ error: 'Invalid payment intent' }, { status: 400 });
            }

            return NextResponse.json({ paymentIntent: update_intent });
        }
    } else {
        // create the intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
        });
        // create the order
        orderData.paymentIntentId = paymentIntent.id;
        await prisma.order.create({
            data: orderData,
        });

        return NextResponse.json({ paymentIntent });
    }
}
