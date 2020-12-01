import AppError from '@shared/errors/AppError';

import FakeUserRespository from '../I_Repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../I_Repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';


let fakeUsersRepository: FakeUserRespository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;

describe('SendForgotPasswordEmail', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUserRespository();
        fakeUserTokensRepository = new FakeUserTokensRepository();


        resetPasswordService = new ResetPasswordService(
            fakeUsersRepository,
            fakeUserTokensRepository,
        );

    });


    it('should be able to reset the password ', async () => {
        //criando usuário
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'Johndoe@exemple.com',
            password: '123123',
        });

        const userToken = await fakeUserTokensRepository.generate(user.id);

        await resetPasswordService.execute({
            password: '123456',
            token: userToken.token,
        });

        const UpdateUser = await fakeUsersRepository.findById(user.id);

        expect(UpdateUser?.password).toBe('123456');
    });// apos criar teste criar a funcionalidade no service


});

// Has
// 2h expiração
// usertoken inexistente
// user inexitente

// RED
// GREEN
// REFACTOR