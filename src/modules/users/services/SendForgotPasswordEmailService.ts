import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../I_Repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '@modules/users/I_Repositories/fakes/FakeUserTokensRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
    email: string,
}

@injectable()
class SendForgotPasswordEmailService {

    constructor(
        //quando iniciando receber esses parametros
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
    ) { }

    public async execute({ email }: IRequest): Promise<void> {

        const user = await this.usersRepository.findbyEmail(
            email
        );

        //usuário existe
        if (!user) {
            throw new AppError('User does not exists.');
        }

        //gerartoken
        await this.userTokensRepository.generate(
            user.id
        );

        this.mailProvider.sendMail(
            email,
            'Pedido de recuperação de senha recebido'
        );
    }

}

export default SendForgotPasswordEmailService;


/*
Regra de negocio da aplicação
recebe a class do repositorio para interação com banco dados
*/