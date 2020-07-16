import User from "../models/User"
import { getCustomRepository } from "typeorm"
import UserRepository from "../repositories/UserRepository"
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import AppError from '../errors/Error'

type loginDTO = Pick<User, "email" | "password">

class AuthService {
    login = async ({ email, password }: loginDTO) => {
        const repository = getCustomRepository(UserRepository)
        const user = await repository.findOne({ where: { email } })

        if (! user)
            throw new AppError('Incorrect email/password combination', 401)

        const passwordCorrect = await compare(password, user.password)

        if (! passwordCorrect)
            throw new AppError('Incorrect email/password combination', 401)

        const token = await this.createToken({ email: user.email })

        return { 
            token, 
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            }
        }
    }

    private createToken = async ({ email }: Pick<User, "email">) => {
        const secret = String(process.env.JWT_SECRET)

        const token = sign({}, secret, {
            subject: email,
            expiresIn: '1d' // 1 day
        })

        return token
    }
}

export default AuthService