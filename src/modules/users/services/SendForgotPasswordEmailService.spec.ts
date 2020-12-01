import FakeUserRespository from '../I_Repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../I_Repositories/fakes/FakeUserTokensRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import AppError from '@shared/errors/AppError';


let fakeUsersRepository: FakeUserRespository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUserRespository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();


        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokensRepository,
        );

    });


    it('should be able recover the password using the email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        //criando usuário
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'Johndoe@exemple.com',
            password: '123456',
        })

        //teste de envio de email
        await sendForgotPasswordEmail.execute({
            email: 'Johndoe@exemple.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });// apos criar teste criar a funcionalidade no service


    it('should not be able to recover a non-existing user password', async () => {
        await expect(sendForgotPasswordEmail.execute({
            email: 'Johndoe@exemple.com',
        })).rejects.toBeInstanceOf(AppError)
    }); // criar a funcionalidade não deve ser capaz de recuparar senha se usuário não esta cadastrado.


    it('should generate a forgot password token', async () => {
        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');
        //criando usuário
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'Johndoe@exemple.com',
            password: '123456',
        });


        await sendForgotPasswordEmail.execute({
            email: 'Johndoe@exemple.com'
        })

        expect(generateToken).toHaveBeenCalledWith(user.id);

    })
});

// RED
// GREEN
// REFACTOR