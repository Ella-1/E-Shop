import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from '@/libs/prismadb'

export async function GetSession() {
    return await getServerSession(authOptions)
}

export async function GetCurrentUser() {
    try {
        const session = await GetSession()

        if (!session?.user?.email) {
            return null
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email
            }
        });

        if (!currentUser) {
            return null
        }

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified || null
        }


    } catch (error: any) {
        return null
    }
}