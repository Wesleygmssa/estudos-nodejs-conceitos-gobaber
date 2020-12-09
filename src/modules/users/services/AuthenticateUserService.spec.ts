import AppError from '@shared/errors/AppError';
import FakeUserRespository from '../I_Repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

//teste unitario
describe('AuthenticateUser', () => {


    it('should be able to authenticate', async () => {

        const fakeUserRespository = new FakeUserRespository(); // criando um repositorio do zero
        const fakeHashProvider = new FakeHashProvider()

        const createUserService = new CreateUserService(fakeUserRespository, fakeHashProvider);
        const authenticateUserService = new AuthenticateUserService(fakeUserRespository, fakeHashProvider);

        //criando usuário
        const user = await createUserService.execute({
            name: 'Wesley',
            email: 'Wesleyguerra9@gmail.com',
            password: '123456',
        });

        //verificando autenticação
        const response = await authenticateUserService.execute({
            email: 'Wesleyguerra9@gmail.com',
            password: '123456',
        });

        // espero que na minha resposta tenha uma propriedade token
        expect(response).toHaveProperty('token'); //usuário autenticado.
        expect(response.user).toEqual(user);
    });

    it('should not be able to authenticate with non existing user ', async () => {
        const fakeUserRespository = new FakeUserRespository(); // criando um repositorio do zero
        const fakeHashProvider = new FakeHashProvider()

        const authenticateUserService = new AuthenticateUserService(
            fakeUserRespository,
            fakeHashProvider
        );

        await expect(authenticateUserService.execute({
            email: 'Wesleyguerra9@gmail.com',
            password: '123456',
        })
        ).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to authenticate with wrong password', async () => {
        const fakeUserRespository = new FakeUserRespository(); // criando um repositorio do zero
        const fakeHashProvider = new FakeHashProvider()

        const createUserService = new CreateUserService(fakeUserRespository, fakeHashProvider);
        const authenticateUserService = new AuthenticateUserService(fakeUserRespository, fakeHashProvider);

        //criando usuário
        await createUserService.execute({
            name: 'Wesley',
            email: 'Wesleyguerra9@gmail.com',
            password: '123456',
        });

        // espero que na minha resposta tenha uma propriedade token
        await expect(authenticateUserService.execute({
            email: 'Wesleyguerra9@gmail.com',
            password: 'worng-password',
        })).rejects.toBeInstanceOf(AppError);
    });

});