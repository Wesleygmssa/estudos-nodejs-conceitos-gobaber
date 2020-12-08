import FakeUserRespository from '../I_Repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

//teste unitario
describe('SendForgotPasswordEmail', () => {

    //Deve ser capaz de recuperar senha usando o email.
    it('should be able to recover the password using the email', async () => {

        const fakeUserRespository = new FakeUserRespository();
        const fakeMailProvider = new FakeMailProvider();

        const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail'); // verifficar se foi chamada

        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUserRespository,
            fakeMailProvider,
        );

        await fakeUserRespository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        await sendForgotPasswordEmail.execute({
            email: 'Johndoe@exemple.com',
        });

        expect(sendEmail).toHaveBeenCalled();
    });
});

// Primeira verificação é teste falhar (RED)
// Segunda verificação é teste passar (GREEN)
// REFACTOR refatoar o codigo