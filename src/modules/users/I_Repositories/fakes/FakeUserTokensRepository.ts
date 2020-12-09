import { uuid } from 'uuidv4';
import IUserTokensRepository from '../IUserTokensRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';


class FakeUserTokensRepository implements IUserTokensRepository {

    private userTokens: UserToken[] = [] //fake banco de dados

    public async generate(user_id: string): Promise<UserToken> {

        //gerando tipo de token
        const userToken = new UserToken();

        Object.assign(userToken, {
            id: uuid(),
            token: uuid(),
            user_id
        })

        // userToken.id = uuid();
        // userToken.token = uuid();
        // user_id;

        this.userTokens.push(userToken)

        return userToken;
    }


    public async findByToken(token: string): Promise<UserToken | undefined> {
        //encontrando token
        const userToken = this.userTokens.find(
            findToken => findToken.token === token,
        );

        return userToken;
    }

}

export default FakeUserTokensRepository;