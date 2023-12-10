import Prisma from "@/libs/prismadb";

interface Iparams {
    productId?: string
}

export default async function getProductById(params: Iparams) {
    try {
        const { productId } = params;
        const product = await prisma?.product.findUnique({
            where: {
                id: productId
            },
            include: {
                reviews: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdDate: 'desc'
                    }
                }
            }
        })
        return product

        if (!product) {
            return null;
        }

    } catch (error: any) {

    }
}