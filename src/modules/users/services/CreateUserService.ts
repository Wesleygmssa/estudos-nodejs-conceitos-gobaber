import { getRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/Users';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../I_Repositories/IUsersRepository'

interface IRequest {
    name: string, email: string, password: string;
}

class CreateUserSerive {

    //pegando repositorio , quando metodo é iniciado receber esses dados
    private usersRepository: IUsersRepository;

    constructor(usersRepository: IUsersRepository) {
        this.usersRepository = usersRepository;
    }

    public async execute({ name, email, password }: IRequest): Promise<User> {

        // const usersRepository = getRepository(User);
        const checkUserExist = await this.usersRepository.findbyEmail(email);

        if (checkUserExist) {
            throw new AppError('Email address already used by another', 400);
        }

        const hasgedPassword = await hash(password, 8)

        const user = this.usersRepository.create({
            name,
            email,
            password: hasgedPassword,
        });

        return user;
    }

}

export default CreateUserSerive;