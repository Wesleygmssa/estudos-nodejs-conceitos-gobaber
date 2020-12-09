import UserToken from "../infra/typeorm/entities/UserToken";

export default interface IUserTokenRepository {
    //gerar token
    generate(user_id: string): Promise<UserToken>;
    //encontrar token
    findByToken(token: string): Promise<UserToken | undefined>;
}