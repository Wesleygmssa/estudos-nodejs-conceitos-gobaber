import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
    private storage: string[] = []; //arquivos que já foram feitos uploads

    public async saveFile(file: string): Promise<string> {
        this.storage.push(file);

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        const findIndex = this.storage.findIndex(storagefile => storagefile === file);

        this.storage.splice(findIndex, 1);

    }
}

export default FakeStorageProvider;
//OBS: arquivo utilizado para teste;