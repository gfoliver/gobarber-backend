import { Repository, getRepository } from 'typeorm'
import User from '@modules/users/infra/typeorm/entities/User'
import IUserRepository from '@modules/users/repositories/IUserRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

class UserRepository implements IUserRepository {
    private repository: Repository<User>
    
    constructor() {
        this.repository = getRepository(User)
    }

    public async create(userData : ICreateUserDTO): Promise<User> {
        const user = this.repository.create(userData)
        
        await this.repository.save(user)

        return user
    }

    public async save(user: User) {
        await this.repository.save(user)

        return user
    }

    public async find(): Promise<User[]> {
        const users = await this.repository.find()

        return users
    }

    public async findByEmail(email: string) {
        const user = await this.repository.findOne({ where: { email } })

        return user
    }
}

export default UserRepository