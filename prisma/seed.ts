import { orders } from "./order";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
    for (let order of orders) {
        await prisma.order.create({
            data: order
        })
    }
}

seed()
.catch((error: Error) => {
    console.log(error)
    process.exit(1)
})
.finally(() => prisma.$disconnect())