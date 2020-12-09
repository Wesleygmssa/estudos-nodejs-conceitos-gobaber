import FakeUsersRespository from '../I_Repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../I_Repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

// variavel com tipos
let fakeUsersRepository: FakeUsersRespository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;


//teste unitario
describe('ResetPassword', () => {

    beforeEach(() => {
        //repositorio dados que interage co banco de dados
        fakeUsersRepository = new FakeUsersRespository();
        fakeUserTokensRepository = new FakeUserTokensRepository();


        //regra de negocio da aplicação
        resetPassword = new ResetPasswordService(
            fakeUsersRepository,
            fakeUserTokensRepository
        );
    });

    // deve ser capaz de resetar a senha
    it('should be able to reset the password', async () => {

        //criando usuário
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        //criando token
        const { token } = await fakeUserTokensRepository.generate(user.id);

        //trocando a senha
        await resetPassword.execute({
            password: '987654321',
            token,
        });


        const updatedUser = await fakeUsersRepository.findById(user.id);


        expect(updatedUser?.password).toBe('987654321');
    });

});

// Primeira verificação de teste é falhar (RED)
// Segunda verificação é o teste passar (GREEN)
// REFACTOR refatoar o codigo