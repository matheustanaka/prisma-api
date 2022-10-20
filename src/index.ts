import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient({
    log: ['query'],
})
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

//Get order by country
app.get('/order/:country', async(req, res) => {
    const { country } = req.params;
    
    const filterByCountry = await prisma.order.findMany({
        where: {
            country: {
                search: country
            }
        },
        orderBy: {
            id: 'asc'
        }
    })

    res.json(filterByCountry)
})

//Create Order
app.post('/order', async (req, res) => {
    const createOrder = await prisma.order.create({
        data: {
            ...req.body
        }
    })

    res.json(createOrder)
})

//Update order
app.put('/order/update/:id', async(req, res) => {
    const { id } = req.params;

    const updateOrder = await prisma.order.update({
        where: {
            id: Number(id)
        },
        data: {
            ...req.body
        }
    })

    res.json(updateOrder)
})

//Delete order
app.delete('/order/:id', async (req, res) => {
    const { id } = req.params;

    const deleteOrder = await prisma.order.delete({
        where: {
            id: Number(id)
        }
    })

    res.json(deleteOrder)
})

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)