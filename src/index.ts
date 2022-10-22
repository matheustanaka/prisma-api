import { Request, Response } from 'express'
import express from 'express'
import cors from 'cors'

import { prisma } from './database/database'
import { Order } from './types/order'

const app = express()
app.use(express.json())
app.use(cors())

//Get all orders
app.get('/orders', async(req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany({
            select: {
                id: true,
                product: true,
                seller: true,
                country: true,
                price: true
            }
        })

        if(!orders) {
            return res.status(404).json({ error: "Not found the orders"})
        }

        return res.status(200).json(orders)
    } catch (error) {
        return res.status(500).json({ error: "Internal server error"})
    }

})

//Get order by id
app.get('/orders/:id', async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
    
        const orderById = await prisma.order.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                product: true,
                seller: true,
                country: true,
                price: true
            }
        })

        if(!orderById) {
            return res.status(404).json({ error: "Not found the Order"})
        }

        return res.status(200).json(orderById)
    } catch (error) {
        return res.status(500).json({ error: "Internal server error"})
    }
})

//Get order by country
app.get('/order/:country', async(req: Request, res: Response) => {
    try {
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

        if(!filterByCountry) {
            return res.status(404).json({ error: "Not found the Country"})
        }
    
        return res.status(200).json(filterByCountry)
        
    } catch (error) {
        return res.status(500).json({ error: "Internal server error"})
    }
})

//Get order by seller
app.get('/order/filter/:seller', async(req: Request, res: Response) => {
    try {
        const { seller } = req.params;

        const filterBySeller = await prisma.order.findMany({
            where: {
                seller: { 
                    in: seller
                }
            },
            orderBy: {
                id: 'asc'
            }
        })

        if(!filterBySeller) {
            return res.status(404).json({ error: "Not found the Seller"})
        }

        return res.status(200).json(filterBySeller)
    } catch (error) {
        return res.status(500).json({ error: "Internal server error"})
    }
})

//Create Order
app.post('/order', async (req: Request, res: Response) => {
    try {
        const createOrder = await prisma.order.create({
            data: {
                ...req.body
            }
        })
    
        return res.status(201).json(createOrder)
    } catch (error) {
        return res.status(500).json({ error: "Internal server error"})
    }
    
})

//Update order
app.put('/order/update/:id', async(req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const updateOrder = await prisma.order.update({
            where: {
                id: Number(id)
            },
            data: {
                ...req.body
            }
        })
    
        if(!updateOrder) {
            return res.status(404).json({ error: "Not found the Order to Update"})
        }
        
        return res.status(200).json(updateOrder)
    } catch (error) {
        return res.status(500).json({ error: "Internal server error"})
    }

})

//Delete order
app.delete('/order/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deleteOrder = await prisma.order.delete({
            where: {
                id: Number(id)
            }
        })

        if(!deleteOrder) {
            return res.status(404).json({ error: "Not found the Order to Delete"})
        }

        return res.status(200).json(deleteOrder)
    } catch (error) {
        return res.status(500).json({ error: "Internal server error"})
    }
    
})

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)