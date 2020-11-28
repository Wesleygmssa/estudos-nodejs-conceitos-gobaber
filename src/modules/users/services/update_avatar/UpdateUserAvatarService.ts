import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../../I_Repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/Users';

interface IRequest {
    user_id: string;
    avatarFileName: string;
}
class UpdateUserAvatarService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }


    public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
        // const usersRepository = getRepository(User); // R.pronto

        const user = await this.usersRepository.findById(user_id); // user || underfined
        console.log(user)

        if (!user) {
            throw new AppError('Only authenticated users can change avatar', 401);
        }

        if (user.avatar) {
            // deletar avatar anterior
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

            const userAvatarFileExistis = await fs.promises.stat(userAvatarFilePath); //verificar se arq exist

            if (userAvatarFileExistis) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName; // atualize a nova foto

        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;