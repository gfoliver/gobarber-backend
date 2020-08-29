import { hash } from "bcryptjs"
import path from 'path'
import fs from 'fs'
import { injectable, inject } from 'tsyringe'

import { filesFolder } from '@config/upload'

import AppError from '@shared/errors/Error'

import User from "@modules/users/infra/typeorm/entities/User"

import IUserRepository from "@modules/users/repositories/IUserRepository"
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import ISaveAvatarDTO from '@modules/users/dtos/ISaveAvatarDTO'

@injectable()
class UserService {
    constructor(
        @inject('UserRepository')
        private repository: IUserRepository
    ) {}

    create = async ({ name, email, password }: ICreateUserDTO): Promise<User> => {
        const userWithSameEmail = await this.repository.findByEmail(email)

        if (userWithSameEmail)
            throw new AppError('Email already registered', 401)

        const hashedPassword = await hash(password, 8)

        const user = this.repository.create({ name, email, password: hashedPassword })

        return user
    }

    saveAvatar = async ({ email, avatar }: ISaveAvatarDTO) => {
        const user = await this.repository.findByEmail(email)

        if (! user)
            throw new AppError('User not found', 401)

        if (user.avatar) {
            const filePath = path.join(filesFolder, user.avatar)

            try {
                await fs.promises.stat(filePath)
                await fs.promises.unlink(filePath)
            }
            catch {}                
        }

        user.avatar = avatar

        await this.repository.save(user)

        return user
    }
}

export default UserService