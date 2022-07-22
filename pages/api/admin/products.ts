import { IProduct } from './../../../interfaces/products';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Product } from '../../../models';
import { isValidObjectId } from 'mongoose';
import { v2 as cloudinay } from 'cloudinary'

cloudinay.config(process.env.CLOUDINARY_URL || '')

type Data =
    | {
        message: string;
    } | IProduct[]
    | IProduct

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProducts(req, res)

        case 'PUT':
            return updateProduct(req, res)
        case 'POST':
            return createProduct(req, res)

        default:
            return res.status(400).json({
                message: 'Bad Request',
            });
    }


}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    await db.connect()
    const products = await Product.find().sort({
        title: 'asc'
    }).lean()

    await db.disconnect()

    const updatedProducts = products.map(product => {
        product.images = product.images.map(image => {
            return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`
        });

        return product;
    })


    return res.status(200).json(updatedProducts);


}
const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { _id = '', images = [] } = req.body as IProduct;

    if (!isValidObjectId(_id)) {
        return res.status(400).json({
            message: 'Producto no existe con ese ID',
        });
    }

    if (images.length < 2) {
        return res.status(400).json({
            message: 'Es necesario al menos 2 imagenes',
        });
    }

    try {
        await db.connect()
        const product = await Product.findById(_id)
        if (!product) {
            await db.disconnect();
            return res.status(400).json({
                message: 'No existe un producto con ese id',
            });
        }

        //https:/res.cloudinary.com/dcpamvrw9/image/upload/v1658447766/i1h5hktdkouanep53ao7.jpg 
        product.images.forEach(async (image) => {
            if (!images.includes(image)) {
                //Delete
                const [fileId, extension] = image.substring(image.lastIndexOf('/') + 1).split('.')
                await cloudinay.uploader.destroy(fileId)
            }
        })
        await product.update(req.body)
        await db.disconnect()

        return res.status(204).json(product)
    } catch (error) {
        console.log(error);

        await db.disconnect()
        return res.status(400).json({
            message: 'Revisar logs en servidor',
        });
    }


}

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { images = [] } = req.body as IProduct

    if (images.length < 2) {
        return res.status(400).json({
            message: 'El producto necesita al menos 2 imagenes',
        });

    }

    try {
        await db.connect();
        const product = new Product(req.body)
        await product.save()
        await db.disconnect();
        return res.status(201).json(product);

    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({
            message: 'Revisar logs del servidor',
        });

    }

}

