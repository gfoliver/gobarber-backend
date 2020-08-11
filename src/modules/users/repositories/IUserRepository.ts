import User from "@modules/users/infra/typeorm/entities/User";
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

interface IUserRepository {
    create(data: ICreateUserDTO): Promise<User>

    save(user: User): Promise<User>

    find(): Promise<User[]>

    findByEmail(email: string): Promise<User | undefined>
}

export default IUserRepository