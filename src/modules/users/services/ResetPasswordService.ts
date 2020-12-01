import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../I_Repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/I_Repositories/fakes/FakeUserTokensRepository';
import AppError from '@shared/errors/AppError';
import { fi } from 'date-fns/locale';

interface IRequest {
    token: string;
    password: string,
}

@injectable()
class ResetPasswordService {

    constructor(
        //quando iniciando receber esses parametros
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
    ) { }

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError(' User token does not exists');
        }

        const user = await this.usersRepository.findById(userToken?.user_id);

        if (!user) {
            throw new AppError('User does not exists');
        }

        user.password = password; //alteração de senha

        await this.usersRepository.save(user);
    }

}

export default ResetPasswordService;


/*
Regra de negocio da aplicação
recebe a class do repositorio para interação com banco dados
*/