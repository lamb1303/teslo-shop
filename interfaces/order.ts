

import { ISize } from '.';
import { ShippingAddress } from './shippingAddress';
import { IUser } from './user';
export interface IOrder {
    _id?: string;
    user?: IUser | string;
    orderItems: IOrderItem[];
    shippingAddress: ShippingAddress;
    paymentResult?: string;
    total: number;
    subTotal: number;
    tax: number;
    numberOfItems: number;
    isPaid: boolean;
    paidAt?: string;
}

export interface IOrderItem {
    _id: string;
    title: string;
    size: ISize;
    quantity: number;
    slug: string;
    image: string;
    price: number;
    gender: string
}