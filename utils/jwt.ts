import jwt from 'jsonwebtoken'

export const signToken = (_id: string, email: string) => {
    if (!process.env.JWT_SECRET_SEED) {
        throw new Error('Check env variables - No JWT seed')
    }

    return jwt.sign({
        //payload
        _id, email
    }, process.env.JWT_SECRET_SEED,
        { expiresIn: '1d' })
}

export const isValidToken = (token: string): Promise<string> => {
    if (!process.env.JWT_SECRET_SEED) {
        throw new Error('Check env variables - No JWT seed')
    }

    if(token.length <= 10){
        Promise.reject('Invalid JWT')
    }

    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
                if (err) {
                    return reject('Invalid JWT')
                }
                const { _id } = payload as { _id: string }
                resolve(_id)
            })

        } catch (error) {
            reject('Invalid JWT')
        }
    })
}