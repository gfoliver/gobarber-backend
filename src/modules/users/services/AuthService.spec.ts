import FakeRepository from '@modules/users/repositories/fake/UserRepository'
import UserService from '@modules/users/services/UserService'
import AuthService from './AuthService'
import AppError from '@shared/errors/Error'
import FakeHashProvider from '@shared/container/providers/HashProvider/fake/FakeHashProvider'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fake/FakeStorageProvider'

const name = 'John Doe'
const email = 'john@doe.com'
const password = '12345'

describe('AuthService', () => {
    it('should be able to login', async () => {
        const repository = new FakeRepository()
        const hashProvider = new FakeHashProvider()
        const storageProvider = new FakeStorageProvider()
        const userService = new UserService(repository, hashProvider, storageProvider)
        const authService = new AuthService(repository, hashProvider)

        await userService.create({ name, email, password })

        const authResponse = await authService.login({ email, password })

        expect(authResponse).toHaveProperty('token')
        expect(authResponse).toHaveProperty('user')
        expect(authResponse.user).toHaveProperty('email', email)
    })

    it('should not be able to login with a wrong email', async () => {
        const repository = new FakeRepository()
        const hashProvider = new FakeHashProvider()
        const storageProvider = new FakeStorageProvider()
        const userService = new UserService(repository, hashProvider, storageProvider)
        const authService = new AuthService(repository, hashProvider)

        await userService.create({ name, email, password })

        expect(authService.login({ email: 'wrong@email.com', password })).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to login with a wrong password', async () => {
        const repository = new FakeRepository()
        const hashProvider = new FakeHashProvider()
        const storageProvider = new FakeStorageProvider()
        const userService = new UserService(repository, hashProvider, storageProvider)
        const authService = new AuthService(repository, hashProvider)

        await userService.create({ name, email, password })

        expect(authService.login({ email, password: 'wrong_password' })).rejects.toBeInstanceOf(AppError)
    })
})