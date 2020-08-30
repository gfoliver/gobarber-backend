import IStorageProvider from '../models/IStorageProvider'
import { diskStorageFolder, filesFolder } from '@config/upload'
import fs from 'fs'
import path from 'path'

export default class DiskStorageProvider implements IStorageProvider {
    public async save(file: string) {
        await fs.promises.rename(
            path.resolve(filesFolder, file), 
            path.resolve(diskStorageFolder, file)
        )

        return file
    }

    public async delete(file: string) {
        const filePath = path.resolve(filesFolder, file)

        try {
            await fs.promises.stat(filePath)
            await fs.promises.unlink(filePath)
        }
        catch {}
    }
}