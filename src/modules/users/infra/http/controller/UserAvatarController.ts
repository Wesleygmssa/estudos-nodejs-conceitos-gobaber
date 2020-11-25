import { Request, Response } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
    public async update(request: Request, response: Response) {
        const usersRepository = new UsersRepository();
        const updateUserAvatarService = new UpdateUserAvatarService(usersRepository);
        //R. User
        const user = await updateUserAvatarService.execute({

            user_id: request.user.id, //global no request
            avatarFileName: request.file.filename, // codigo da imagem
        });

        // delete user.password;

        return response.json(user)
    }
}