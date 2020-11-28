import { Request, Response } from 'express';

// import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
    public async create(request: Request, response: Response) {
        // const usersRepository = new UsersRepository();
        const createUserService = container.resolve(CreateUserService);

        const { name, email, password } = request.body;

        const user = await createUserService.execute({ name, email, password });

        return response.json(user);
    }
}