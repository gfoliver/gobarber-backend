import IHashProvider from '../models/IHashProvider'
import { hash, compare as bcryptCompare } from 'bcryptjs'

export default class BCryptHashProvider implements IHashProvider {
    public async generate(payload: string) {
        return hash(payload, 8)
    }

    public async compare(payload: string, hash: string) {
        return bcryptCompare(payload, hash)
    }
}