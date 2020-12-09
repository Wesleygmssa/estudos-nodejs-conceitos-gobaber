import FakeUsersRespository from '../I_Repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import AppError from '@shared/errors/AppError';
import FakeUserTokensRepository from '../I_Repositories/fakes/FakeUserTokensRepository';


let fakeUsersRepository: FakeUsersRespository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;
//teste unitario
describe('SendForgotPasswordEmail', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRespository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();


        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokensRepository
        );
    })

    //Deve ser capaz de recuperar senha usando o email.
    it('should be able to recover the password using the email', async () => {

        const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail'); // verifficar se foi chamada
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        await sendForgotPasswordEmail.execute({
            email: 'Johndoe@exemple.com',
        });

        expect(sendEmail).toHaveBeenCalled();
    });

    //Não deve ser capaz de recuperar a senha se usuário não existente
    it('should not be able to recover a non-existing user password', async () => {



        await expect(
            sendForgotPasswordEmail.execute({
                email: 'johndoe@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    })

    //deve gerar um token de senha esquecido
    it('should generate a forgot password token', async () => {

        // quando fizer a recueração de senha o metodo generate seja chamado.
        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await sendForgotPasswordEmail.execute({
            email: 'johndoe@example.com',
        })

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});

// Primeira verificação de teste é falhar (RED)
// Segunda verificação é o teste passar (GREEN)
// REFACTOR refatoar o codigo