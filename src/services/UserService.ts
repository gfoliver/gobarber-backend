import User from "../models/User"
import UserRepository from "../repositories/UserRepository"
import { getCustomRepository } from "typeorm"
import { hash } from "bcryptjs"
import { filesFolder } from '../config/upload'
import path from 'path'
import fs from 'fs'
import AppError from '../errors/Error'

type CreateUserDTO = Pick<User, "name" | "email" | "password">
type SaveAvatarDTO = Pick<User, "email" | "avatar">

class UserService {
    create = async ({ name, email, password }: CreateUserDTO): Promise<User> => {
        const repository = getCustomRepository(UserRepository)

        const userWithSameEmail = await repository.findOne({ where: { email } })

        if (userWithSameEmail)
            throw new AppError('Email already registered', 401)

        const hashedPassword = await hash(password, 8)

        const user = repository.create({ name, email, password: hashedPassword })

        await repository.save(user)

        return user
    }

    saveAvatar = async ({ email, avatar }: SaveAvatarDTO) => {
        const repository = getCustomRepository(UserRepository)
        const user = await repository.findOne({ where: { email } })

        if (! user)
            throw new AppError('User not found', 401)

        if (user.avatar) {
            const filePath = path.join(filesFolder, user.avatar)

            const fileExists = await fs.promises.stat(filePath)

            if (fileExists)
                await fs.promises.unlink(filePath)
        }

        user.avatar = avatar

        await repository.save(user)

        return user
    }
}

export default UserService