import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

//Get all orders
app.get('/orders', async(req, res) => {
    const orders = await prisma.order.findMany()

    res.json(orders)
})

//Get order by id
app.get('/orders/:id', async(req, res) => {
    const { id } = req.params;
    
    const orderById = await prisma.order.findUnique({
        where: {
            id: Number(id)
        }
    })

    res.json(orderById)
})

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)