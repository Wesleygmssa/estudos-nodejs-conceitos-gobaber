import { inject, injectable } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
import IUsersRepository from '../I_Repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IRequest {
    email: string,
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('MailProvider')
        private mailProvider: IMailProvider,
    ) { }

    public async execute({ email }: IRequest): Promise<void> {
        this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido');
    }

}

export default SendForgotPasswordEmailService;


/*
Regra de negocio da aplicação
recebe a class do repositorio para interação com banco dados
*/