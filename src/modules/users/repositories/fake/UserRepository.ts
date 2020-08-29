import User from '@modules/users/infra/typeorm/entities/User'
import IUserRepository from '@modules/users/repositories/IUserRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

class UserRepository implements IUserRepository {
    private users: User[]
    
    constructor() {
        this.users = []
    }

    public async create(userData : ICreateUserDTO): Promise<User> {
        let user = new User()
        Object.assign(user, { id: this.users.length + 1, ...userData })
        
        this.users.push(user)

        return user
    }

    public async save(user: User) {
        const { id } = user
        const index = this.users.findIndex(u => u.id == id)

        if (index != -1) {
            this.users[index] = user
        }

        return this.users[index]
    }

    public async find(): Promise<User[]> {
        return this.users
    }

    public async findByEmail(email: string) {
        const user = this.users.find(u => u.email == email)

        return user
    }
}

export default UserRepository