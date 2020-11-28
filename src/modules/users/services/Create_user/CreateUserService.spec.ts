import AppError from '@shared/errors/AppError';
import FakeUserRespository from '../../I_Repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';




//teste unitario
describe('CreateUser', () => {

    it('should be able to create new user', async () => {

        const fakeUserRespository = new FakeUserRespository();
        const createUserService = new CreateUserService(fakeUserRespository);

        const user = await createUserService.execute({
            email: 'John Doe',
            name: 'Johndoe@exemple.com',
            password: '123456'
        });

        expect(user).toHaveProperty('id')

    });

    it('should be able to create a new user with same email from another', async () => {

        const fakeUserRespository = new FakeUserRespository();
        const createUserService = new CreateUserService(fakeUserRespository);

        await createUserService.execute({
            name: 'John Doe',
            email: 'Johndoe@exemple.com',
            password: '123456'
        });

        expect(
            createUserService.execute({
                email: 'John Doe',
                name: 'Johndoe@exemple.com',
                password: '123456'
            }),

        ).rejects.toBeInstanceOf(AppError)

    });


})