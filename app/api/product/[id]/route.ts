import { GetCurrentUser } from "@/actions/getCurrentUser";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest, {params}:{params:{id: string}} ) {
     const currentUser =  await GetCurrentUser();
     if (!currentUser || currentUser.role !== 'ADMIN') {
        console.log('Unauthorized request:', currentUser);
        return NextResponse.error(); // Return a 403 Forbidden error
    }
}