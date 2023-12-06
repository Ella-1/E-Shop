import { GetCurrentUser } from '@/actions/getCurrentUser';
import prisma from '@/libs/prismadb'
import { NextResponse, NextRequest } from 'next/server';

export async function PUT(request:Request) {
    const currentUser = await GetCurrentUser();

    if (!currentUser || currentUser.role !== 'ADMIN') {
        console.log('Unauthorized request:', currentUser);
        return NextResponse.error(); // Return a 403 Forbidden error
    }

    const body = await request.json()
    const {id,  deliveryStatus} = body

    const order = await prisma.order.update({
        where: {id: id},
        data:{ deliveryStatus}
    })

    return NextResponse.json(order)
}