import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../I_Repositories/IUsersRepository';
import IUserTokensRepository from '../I_Repositories/IUserTokensRepository';


interface IRequest {
    email: string,
}

@injectable()
class SendForgotPasswordEmailService {

    //pegando repositorio , quando metodo é iniciado receber esses dados
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private emailProvider: IMailProvider,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
    ) { }

    public async execute({ email }: IRequest): Promise<void> {

        const user = await this.usersRepository.findbyEmail(email);

        if (!user) {
            throw new AppError('User does not exists');
        }

        await this.userTokensRepository.generate(user.id);

        this.emailProvider.sendMail(
            email,
            'Pedido de recuperação de senha recebido'
        );
    }

}

export default SendForgotPasswordEmailService;


