import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/Error'

import User from "@modules/users/infra/typeorm/entities/User"

import IUserRepository from "@modules/users/repositories/IUserRepository"
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import ISaveAvatarDTO from '@modules/users/dtos/ISaveAvatarDTO'
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'

@injectable()
class UserService {
    constructor(
        @inject('UserRepository')
        private repository: IUserRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) {}

    create = async ({ name, email, password }: ICreateUserDTO): Promise<User> => {
        const userWithSameEmail = await this.repository.findByEmail(email)

        if (userWithSameEmail)
            throw new AppError('Email already registered', 401)

        const hashedPassword = await this.hashProvider.generate(password)

        const user = this.repository.create({ name, email, password: hashedPassword })

        return user
    }

    saveAvatar = async ({ email, avatar }: ISaveAvatarDTO) => {
        const user = await this.repository.findByEmail(email)

        if (! user)
            throw new AppError('User not found', 401)

        if (user.avatar) {
            await this.storageProvider.delete(user.avatar)
        }

        const newAvatar = await this.storageProvider.save(avatar)

        user.avatar = newAvatar

        await this.repository.save(user)

        return user
    }
}

export default UserService