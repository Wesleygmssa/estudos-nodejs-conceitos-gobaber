// import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../../I_Repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/Users';



interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string
}

@injectable()
class AuthencateUserService {

    // //pegando repositorio
    // private usersRepository: IUsersRepository;
    // constructor(usersRepository: IUsersRepository) {
    //     this.usersRepository = usersRepository;
    // }

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        // const usersRepository = getRepository(User); // todos metodos

        const user = await this.usersRepository.findbyEmail(email)

        if (!user) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        //user.password = senha criptografada
        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        //gerando token
        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id, //Identificação do usuário que ficara global 
            expiresIn: authConfig.jwt.expirenIn,
        });

        return {
            user,
            token,
        }

    }
}

export default AuthencateUserService;