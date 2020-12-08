import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../I_Repositories/IUsersRepository';


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
    ) { }

    public async execute({ email }: IRequest): Promise<void> {
        this.emailProvider.sendMail(email, 'Pedido de recuperação de senha recebido');
    }

}

export default SendForgotPasswordEmailService;


