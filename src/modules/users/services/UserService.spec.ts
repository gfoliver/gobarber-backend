import FakeRepository from '../repositories/fake/UserRepository'
import UserService from './UserService'
import AppError from '@shared/errors/Error'

const name = 'John Doe'
const email = 'john@doe.com'
const password = '12345'
const avatar = 'avatar.png'

describe('UserService', () => {
    it('should be able to create a new user', async () => {
        const repository = new FakeRepository()
        const service = new UserService(repository)

        const user = await service.create({ name, email, password })

        expect(user).toHaveProperty('id')
        expect(user).toHaveProperty('name', name)
        expect(user).toHaveProperty('email', email)
    })

    it('should not be able to create two users with the same email', async () => {
        const repository = new FakeRepository()
        const service = new UserService(repository)

        await service.create({ name, email, password })

        expect(service.create({ name, email, password })).rejects.toBeInstanceOf(AppError)
    })

    it('should be able to change a user\'s avatar', async () => {
        const repository = new FakeRepository()
        const service = new UserService(repository)

        const user = await service.create({ name, email, password })
        
        // Saving it twice to test filesystem
        await service.saveAvatar({email: user.email, avatar})
        await service.saveAvatar({email: user.email, avatar})

        expect(user).toHaveProperty('avatar', avatar)
    })

    it('should not be able to change the avatar of a user that doesnt exists', async () => {
        const repository = new FakeRepository()
        const service = new UserService(repository)

        expect(service.saveAvatar({ email, avatar })).rejects.toBeInstanceOf(AppError)
    })
})