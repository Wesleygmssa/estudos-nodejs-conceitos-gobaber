import { Request, Response } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';

export default class SessionsController {
    public async create(request: Request, response: Response) {
        const authenticateUserService = container.resolve(AuthenticateUserService)
        const { email, password } = request.body;
        const { token, user } = await authenticateUserService.execute({
            email,
            password
        });

        // delete user.password;
        return response.json({ user, token });
    }
}

/*
Abstrair arquivo das rotas
Receber requisição
repassar pra outro arquivo lidar com isso.
retorna uma respota
*/