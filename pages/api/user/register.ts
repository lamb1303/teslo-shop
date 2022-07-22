import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { User } from '../../../models';
import { jwt, validations } from '../../../utils';

type Data =
    | {
        message: string;
    }
    | {
        token: string, user: {
            email: string,
            role: string,
            name: string
        }
    }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return registerUser(req, res)

        default:
            res.status(400).json({
                message: 'Bad request'
            })
    }

}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { email = '', password = '', name = '' } = req.body //as { email: string, password: string, name: string };

    await db.connect();
    const user = await User.findOne({ email })

    if (password.length < 6) {
        return res.status(400).json({ message: 'The password must contain more tha 6 words' })
    }

    if (name.length < 2) {
        return res.status(400).json({ message: 'The name must contain more tha 2 words' })
    }

    if(!validations.isValidEmail(email)){
        return res.status(400).json({ message: 'The email is not correct' })
    }


    if (user) {
        await db.disconnect();
        return res.status(400).json({ message: 'This mail is already used' })
    }

    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync(password),
        role: 'client',
        name

    })

    try {
        await newUser.save({ validateBeforeSave: true })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Check server logs' })
    }

    const { role, _id } = newUser;
    const token = jwt.signToken(_id, email)

    return res.status(200).json({
        token,
        user: {
            email,
            role,
            name
        }
    })
}

