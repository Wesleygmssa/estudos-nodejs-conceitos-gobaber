import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../I_Repositories/IUsersRepository';
import IUserTokensRepository from '../I_Repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    token: string,
    password: string,
}

@injectable()
class ResetPasswordService {

    //pegando repositorio , quando metodo é iniciado receber esses dados
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) { }

    public async execute({ token, password }: IRequest): Promise<void> {

        const userToken = await this.userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User token does not exists');
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('User  does not exists');
        }

        user.password = await this.hashProvider.generateHash(password);

        await this.usersRepository.save(user);
    }

}

export default ResetPasswordService;


/*
Regra de negocio da aplicação
recebe a class do repositorio para interação com banco dados
*/