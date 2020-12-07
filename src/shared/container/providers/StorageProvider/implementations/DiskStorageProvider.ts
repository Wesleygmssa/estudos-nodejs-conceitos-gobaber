import IStorageProvider from '../models/IStorageProvider';
import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

class DiskStorageProvider implements IStorageProvider {
    public async saveFile(file: string): Promise<string> {
        await fs.promises.rename( //importa arquivo de um pasta para outra
            path.resolve(uploadConfig.tmpFolder, file), //tmp
            path.resolve(uploadConfig.uploadsFolder, 'uploads', file), //uploads
        );

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        const filePath = path.resolve(uploadConfig.uploadsFolder, file);
        try {
            await fs.promises.stat(filePath); // verificar se arquivo exits
        } catch {
            return
        }

        await fs.promises.unlink(filePath);
    }
}

export default DiskStorageProvider;