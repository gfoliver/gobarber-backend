import path from 'path'
import crypto from 'crypto'
import multer from 'multer'

export const filesFolder = path.resolve(__dirname, '..', '..', 'storage')

export default {
    storage: multer.diskStorage({
        destination: filesFolder,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex')

            const fileName = `${fileHash}-${file.originalname}`

            return callback(null, fileName)
        }
    })
}