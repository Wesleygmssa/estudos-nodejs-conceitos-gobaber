import { Request, Response } from 'express';

import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
    public async update(request: Request, response: Response) {
        const updateUserAvatarService = container.resolve(UpdateUserAvatarService);
        const user = await updateUserAvatarService.execute({

            user_id: request.user.id, //global no request
            avatarFileName: request.file.filename, // codigo da imagem
        });

        // delete user.password;

        return response.json(user)
    }
}

/*
Abstrair arquivo das rotas
Receber requisição
repassar pra outro arquivo lidar com isso.
retorna uma respota
*/