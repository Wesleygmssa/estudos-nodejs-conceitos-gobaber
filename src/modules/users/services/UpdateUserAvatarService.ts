// import path from 'path';
// import fs from 'fs';
// import uploadConfig from '@config/upload';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../I_Repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import User from '@modules/users/infra/typeorm/entities/Users';

interface IRequest {
    user_id: string;
    avatarFileName: string;
}
@injectable()
class UpdateUserAvatarService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('StorageProvider')
        private StorageProvider: IStorageProvider,
    ) { }


    public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
        // const usersRepository = getRepository(User); // R.pronto

        const user = await this.usersRepository.findById(user_id); // user || underfined
        // console.log(user);

        if (!user) {
            throw new AppError('Only authenticated users can change avatar', 401);
        }

        if (user.avatar) {
            await this.StorageProvider.deleteFile(user.avatar);
        }

        const filename = await this.StorageProvider.saveFile(user.avatar);

        user.avatar = filename;  //atualize a nova foto

        await this.usersRepository.save(user);

        return user;
    }
}
export default UpdateUserAvatarService;

/*
Regra de negocio da aplicação
recebe a class do repositorio para interação com banco dados
*/