import { db } from "./"
import { IProduct } from './../interfaces';
import { Product } from "../models";


export const getProductBySlug = async (slug: string): Promise<IProduct | null> => {
    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();

    if (!product) {
        return null
    }

    return JSON.parse(JSON.stringify(product))
}

export const getAllProductsBySlug = async (): Promise<IProduct[]> => {
    await db.connect();
    const products = await Product.find().select('slug -_id').lean();
    await db.disconnect();

    return products;
}

export const getProductsByTerm = async (term: string): Promise<IProduct[]> => {

    term = term.toString().toLocaleLowerCase();
    await db.connect();
    const products = await Product.find({
        $text: { $search: term }
    })
    .select('title images price inStock slug -_id')
    .lean();
    await db.disconnect();

    return products

}