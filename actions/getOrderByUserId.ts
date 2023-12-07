import prisma from '@/libs/prismadb'

export default async function GetOrdersByUserId(userId:string) {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: true
            },
            orderBy: {
                createdDate: 'desc'
            },
            where: {
                userId: userId
            }
        })
        return orders
    } catch(error: any) {
        throw new Error(error)
    }
    
}