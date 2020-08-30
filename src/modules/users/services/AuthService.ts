import { sign } from 'jsonwebtoken'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/Error'

import User from "@modules/users/infra/typeorm/entities/User"

import IUserRepository from "@modules/users/repositories/IUserRepository"
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider'

type loginDTO = Pick<User, "email" | "password">

@injectable()
class AuthService {
    constructor(
        @inject('UserRepository')
        private repository: IUserRepository,

        private hashProvider: IHashProvider
    ) {}

    login = async ({ email, password }: loginDTO) => {
        const user = await this.repository.findByEmail(email)

        if (! user)
            throw new AppError('Incorrect email/password combination', 401)

        const passwordCorrect = await this.hashProvider.compare(password, user.password)

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