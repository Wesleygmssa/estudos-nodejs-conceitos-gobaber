import AppError from '@shared/errors/AppError';
import FakeUsersRespository from '../I_Repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../I_Repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';

// variavel com tipos
let fakeUsersRepository: FakeUsersRespository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;


//teste unitario
describe('ResetPasswordService', () => {

    beforeEach(() => {
        //repositorio dados que interage co banco de dados
        fakeUsersRepository = new FakeUsersRespository();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        fakeHashProvider = new FakeHashProvider();

        resetPassword = new ResetPasswordService(
            fakeUsersRepository,
            fakeUserTokensRepository,
            fakeHashProvider
        );
    });

    // deve ser capaz de resetar a senha
    it('should be able to reset the password', async () => {

        //retornando usuário
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        const { token } = await fakeUserTokensRepository.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

        await resetPassword.execute({
            token,
            password: '123123',
        });


        const updatedUser = await fakeUsersRepository.findById(user.id);

        expect(generateHash).toHaveBeenCalledWith('123123');
        expect(updatedUser?.password).toBe('987654321');
    });

    it('shouls not able to reset the password with non-existing token', async () => {
        await expect(
            resetPassword.execute({
                token: 'non-existing-token',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(AppError);
    })

    it('shouls not able to reset the password with non-existing user', async () => {

        const { token } = await fakeUserTokensRepository.generate('non-existing-user')

        await expect(
            resetPassword.execute({
                token,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(AppError);
    })

    it('should not be able to reset password if passed more than 2 hours', async () => {

        const user = await fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '123456'
        });

        const { token } = await fakeUserTokensRepository.generate(user.id); //geradp token

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3);
        });

        await expect(resetPassword.execute({
            password: '123123',
            token,
        })).rejects.toBeInstanceOf(AppError);
    })

});

// Primeira verificação de teste é falhar (RED)
// Segunda verificação é o teste passar (GREEN)
// REFACTOR refatoar o codigo