export default async function GetUsers() {
    try{
        const users = prisma?.user.findMany()
        return users

    } catch(error:any) {
        throw new Error(error)
    }
}
