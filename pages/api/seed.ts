import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../models';
import { db, seedData } from '../../database';

type Data = {
    message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (process.env.NODE_ENV === 'production') {
        return res.status(401).json({
            message: 'You have no access to this service',
        });
    }
    await db.connect();
    await Product.deleteMany();
    await Product.insertMany(seedData.initialData.products);
    await db.disconnect();

    res.status(200).json({
        message: 'Seed data created succefully',
    });
}