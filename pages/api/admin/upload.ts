import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { v2 as cloudinay } from 'cloudinary'

cloudinay.config(process.env.CLOUDINARY_URL || '')


type Data = {
    message: string;
};

export const config = {
    api: {
        bodyParser: false
    }
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':

            return uploadFile(req, res)

        default:
            return res.status(400).json({
                message: 'Bad request',
            });
    }


}

const saveFile = async (file: formidable.File): Promise<string> => {
    // Guarda archivos en local system (NO REALIZAR DE ESTA FORMA)
    // const data = fs.readFileSync(file.filepath)

    // fs.writeFileSync(`./public/${file.originalFilename}`, data);
    // fs.unlinkSync(file.filepath)// Elimina
    // return;

    const { secure_url } = await cloudinay.uploader.upload(file.filepath)
    return secure_url
}

const parseFiles = async (req: NextApiRequest):Promise<string> => {
    return new Promise((resolve, reject) => {

        const form = new formidable.IncomingForm()
        form.parse(req, async (error, fields, files) => {
            console.log({ error, fields, files });

            if (error) {
                return reject(error)
            }

           const filePaht =  await saveFile(files.file as formidable.File)
            resolve(filePaht)
        })
    })

}

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const imageURL = await parseFiles(req)
    return res.status(200).json({
        message: imageURL,
    });
}
