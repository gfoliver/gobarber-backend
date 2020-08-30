import FakeRepository from '../repositories/fake/UserRepository'
import UserService from './UserService'
import AppError from '@shared/errors/Error'
import FakeHashProvider from '@shared/container/providers/HashProvider/fake/FakeHashProvider'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fake/FakeStorageProvider'

const name = 'John Doe'
const email = 'john@doe.com'
const password = '12345'
const avatar = 'avatar.png'

describe('UserService', () => {
    it('should be able to create a new user', async () => {
        const repository = new FakeRepository()
        const hashProvider = new FakeHashProvider()
        const storageProvider = new FakeStorageProvider()
        const service = new UserService(repository, hashProvider, storageProvider)

        const user = await service.create({ name, email, password })

        expect(user).toHaveProperty('id')
        expect(user).toHaveProperty('name', name)
        expect(user).toHaveProperty('email', email)
    })

    it('should not be able to create two users with the same email', async () => {
        const repository = new FakeRepository()
        const hashProvider = new FakeHashProvider()
        const storageProvider = new FakeStorageProvider()
        const service = new UserService(repository, hashProvider, storageProvider)

        await service.create({ name, email, password })

        expect(service.create({ name, email, password })).rejects.toBeInstanceOf(AppError)
    })

    it('should be able to change a user\'s avatar', async () => {
        const repository = new FakeRepository()
        const hashProvider = new FakeHashProvider()
        const storageProvider = new FakeStorageProvider()
        const service = new UserService(repository, hashProvider, storageProvider)

        const user = await service.create({ name, email, password })

        const avatar2 = 'test.png'

        const wasDeleted = spyOn(storageProvider, 'delete')

        // Saving it twice to test filesystem
        await service.saveAvatar({email: user.email, avatar})
        await service.saveAvatar({email: user.email, avatar: avatar2})

        expect(user).toHaveProperty('avatar', avatar2)
        expect(wasDeleted).toBeCalledWith(avatar)
    })

    it('should not be able to change the avatar of a user that doesnt exists', async () => {
        const repository = new FakeRepository()
        const hashProvider = new FakeHashProvider()
        const storageProvider = new FakeStorageProvider()
        const service = new UserService(repository, hashProvider, storageProvider)

        expect(service.saveAvatar({ email, avatar })).rejects.toBeInstanceOf(AppError)
    })
})