import { Request, Response, NextFunction } from 'express'
import response from '@shared/infra/http/utils/response'
import { verify } from 'jsonwebtoken'
import AppError from '@shared/errors/Error'

interface decodedData {
    sub: string
    iat: number,
    exp: number
}

export default async function verifyToken (req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    if (!authorization)
        return response({
            res,
            status: false,
            statusCode: 401,
            message: 'Token not provided'
        })

        
    const [ type, token ] = authorization.split(' ')
    
    const secret = String(process.env.JWT_SECRET)

    try {
        const { sub } = verify(token, secret) as decodedData
        
        req.user = { email: sub }

        return next()
    }
    catch(error) {
        throw new AppError('Token invalid', 401)
    }
}