import { GetCurrentUser } from "@/actions/getCurrentUser";
import { NextRequest,NextResponse } from "next/server";

export async function DELETE(request: NextRequest, {params}:{params:{id: string}} ) {
     const currentUser =  await GetCurrentUser();
     if (!currentUser || currentUser.role !== 'ADMIN') {
        console.log('Unauthorized request:', currentUser);
        return NextResponse.error(); // Return a 403 Forbidden error
    }

    const product = await prisma?.product.delete({
        where: {id: params.id}
    })

    return NextResponse.json(product)
} 