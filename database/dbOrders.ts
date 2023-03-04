import { connect } from './db';
import { isValidObjectId } from 'mongoose';
import { IOrder } from './../interfaces/order';
import { db } from '.';
import { Order } from '../models';
export const getOrderById = async (id: string): Promise<IOrder | null> => {
    if (!isValidObjectId(id)) {
        return null
    }
    await db.connect();
    const order = await Order.findById(id).lean();
    await db.disconnect();

    if (!order) {
        return null
    }

    const formattedOrdersImage = {
        ...order,
        orderItems: order.orderItems.map((item) => {
            const obj = {
                ...item,
                image: item.image.includes('http') ? item.image : `${process.env.HOST_NAME}products/${item.image}`
            }
            return obj
        })
    }


    return JSON.parse(JSON.stringify(formattedOrdersImage));


}

export const getOrdersByUser = async (id: string): Promise<IOrder[]> => {
    if (!isValidObjectId(id)) {
        return []
    }

    await db.connect();
    const orders = await Order.find({ user: id }).lean();
    await db.disconnect();

    return JSON.parse(JSON.stringify(orders))


}