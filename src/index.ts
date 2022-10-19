import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const newOrder = await prisma.order.create({
        data: {
            product: 'Laptop #1',
            seller: 'Seller #1',
            country: 'BRA',
            price: 1000
        }
    })

    console.log('Created new Order', newOrder)

    const allOrders = await prisma.order.findMany({})

    console.log('All orders: ')
    console.dir(allOrders, { depth: null})
}

main().catch((e) => console.error(e)).finally(async () => await prisma.$disconnect())