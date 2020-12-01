// import AppError from '@shared/errors/AppError';

import FakeUserRespository from '../I_Repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';


describe('SendForgotPasswordEmail', () => {

    it('should be able recover the password using the email', async () => {

        const fakeUserRespository = new FakeUserRespository();
        const fakeMailProvider = new FakeMailProvider();

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUserRespository, fakeMailProvider
        );

        //criando usuário
        await fakeUserRespository.create({
            name: 'John Doe',
            email: 'Johndoe@exemple.com',
            password: '123456',
        })

        //teste de envio de email
        await sendForgotPasswordEmail.execute({
            email: 'Johndoe@exemple.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });

});

// RED
// GREEN
// REFACTOR