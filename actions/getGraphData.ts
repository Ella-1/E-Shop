import prisma  from "@/libs/prismadb";
import moment from "moment";

export async function GetGraphData() {
    try {
        // get the stats and the response of data for the last seven days
        const startDate = moment().subtract(6,"days").startOf("day")
        const endDate = moment().endOf("day")

        // query the database to get order data grouped by createddata
        const result = await prisma.order.groupBy({
            by: ["createdDate"],
            where: {
                createdDate: {
                    gte: startDate.toISOString(),
                    lte: endDate.toISOString(),
                },
                status: 'completed'
            },
            _sum: {
                amount: true
            }
        });

        // initialise an object to aggregate the data by day
        const aggregatedData :{
            [day: string]: {day: string; date:string; totalAmount: number}
        } = {};

        // create a clone of start date to iterateover each day
        const currentDate = startDate.clone();

        // iterate over each day in the date range
        while(currentDate<=endDate){
            // formate the day as a string as string eg monday
            const day = currentDate.format('dddd');
            console.log("day<<<<", day, currentDate);

            // initialiase the aggragate data
            aggregatedData[day] = {
                day, date:currentDate.format("YYYY-MM-DD"),
                totalAmount: 0
            }
            // move to nextday
            currentDate.add(1, "day")
        }

        // calculate the total amount for eachday by summing their amounts
        result.forEach((entry: any)=> {
            const day = moment(entry.createdDate).format("dddd");
            const amount = entry._sum.amount || 0;
            aggregatedData[day].totalAmount += amount
        });

        // convert aggragted data to an array sort f data
        const formattedData = Object.values(aggregatedData).sort((a,b) => 
            moment(a.date).diff(moment(b.date))
        )
        return formattedData


    } catch(error:any) {
        throw new Error(error)
    }
}
