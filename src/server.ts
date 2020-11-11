import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import uploadConfig from './config/upload';
import './database'; // importando conexão database 

const app = express();
app.use(express.json()); // utlizando formato json sempre acima das rotas
app.use(routes);// ordem linear 
app.use('/file', express.static(uploadConfig.directory)); //exibir fotos localhost

app.listen(3333, () => {
    console.log('🚀Server started on port 3333! 🚀')
})