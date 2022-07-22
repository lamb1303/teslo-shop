import { IProduct } from './../../../interfaces/products';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Product } from '../../../models';

type Data = |
{
    message: string
}
    | IProduct

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(400).json({
        message: 'Query search not found'
    })
}