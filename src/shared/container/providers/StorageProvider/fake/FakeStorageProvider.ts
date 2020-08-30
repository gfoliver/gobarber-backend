import IStorageProvider from "../models/IStorageProvider";

export default class FakeStorageProvider implements IStorageProvider {
    private storage: string[] = []
    
    public async save(file: string) {
        this.storage.push(file)

        return file
    }

    public async delete(file: string) {
        const fileIndex = this.storage.findIndex(f => f === file)

        if (fileIndex !== -1)
            this.storage.splice(fileIndex, 1)
    }
}