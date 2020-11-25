import { Request, Response } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
    public async create(request: Request, response: Response) {
        const usersRepository = new UsersRepository();
        const createUserService = new CreateUserService(usersRepository);

        const { name, email, password } = request.body;

        const user = await createUserService.execute({ name, email, password });

        return response.json(user);
    }
}