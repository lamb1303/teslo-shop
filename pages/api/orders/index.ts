import { IOrder } from './../../../interfaces/order';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { Order, Product } from '../../../models';
import { db } from '../../../database';


type Data = {
    message: string;
} | IOrder

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':

            return createOrder(req, res);

        default:
            return res.status(400).json({
                message: 'Bad request',
            });
    }


}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { orderItems, total } = req.body as IOrder;

    //Vreify the user session
    const session: any = await getSession({
        req
    })

    if (!session) {
        return res.status(401).json({ message: 'You must be authenticated' })
    }

    // Array with the products that the user wants
    const productsIds = orderItems.map((product) => product._id);
    await db.connect();

    const dbProducts = await Product.find({ _id: { $in: productsIds } })

    try {
        const subTotal = orderItems.reduce(
            (prev, current) => {
                const currentPrice = dbProducts.find(prod => prod.id === current._id)!.price

                if (!currentPrice) {
                    throw new Error('Verify the information again')
                }
                return (currentPrice * current.quantity) + prev
            }, 0
        );

        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)
        const backendTotal = subTotal * (taxRate + 1);

        if (total !== backendTotal) {
            throw new Error('The total dont match')
        }

        const userId = session.user?._id;
        const newOrder = new Order({
            ...req.body,
            isPais: false,
            user: userId
        })
        newOrder.total = Math.round(newOrder.total * 100) / 100;
        await newOrder.save();

        return res.status(201).json(newOrder)

    } catch (error: any) {
        await db.disconnect();
        console.log(error);
        res.status(400).json({
            message: error.message || 'check log server'
        })

    }

    return res.status(201).json(req.body);
}
