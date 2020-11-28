import { getRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/Users';
// import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';


import AppError from '@shared/errors/AppError';
import IUsersRepository from '../../I_Repositories/IUsersRepository'
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';

interface IRequest {
    name: string, email: string, password: string;
}

@injectable()
class CreateUserSerive {

    //pegando repositorio , quando metodo é iniciado receber esses dados
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) { }

    public async execute({ name, email, password }: IRequest): Promise<User> {

        // const usersRepository = getRepository(User);
        const checkUserExist = await this.usersRepository.findbyEmail(email);

        if (checkUserExist) {
            throw new AppError('Email address already used by another', 400);
        }

        const hasgedPassword = await this.hashProvider.generateHash(password);

        const user = this.usersRepository.create({
            name,
            email,
            password: hasgedPassword,
        });

        return user;
    }

}

export default CreateUserSerive;