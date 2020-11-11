import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import uploadConfig from './config/upload';
import './database'; // importando conexão database 

const app = express();
app.use(express.json()); // utlizando formato json sempre acima das rotas
app.use('/file', express.static(uploadConfig.directory)); //exibir fotos localhost
app.use(routes);// ordem linear 
//trativa de erro
// app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
//     if()
// });


app.listen(3333, () => {
    console.log('🚀Server started on port 3333! 🚀')
})