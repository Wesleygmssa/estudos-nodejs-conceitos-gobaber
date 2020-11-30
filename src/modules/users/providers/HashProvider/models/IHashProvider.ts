//Quais são metodos IHashProvider deve ter
interface IHashProvider {
    generateHash(payload: string): Promise<string>;
    compareHash(payload: string, hashed: string): Promise<boolean>;
}

export default IHashProvider;