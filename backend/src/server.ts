import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes/index';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();

app.use(express.json());
// Toda rota que vem com o prefixo "files"
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

/* middleware para tratativa de erros é diferente dos outros no numero de parâmetros
 */
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  // verificando se o erro foi gerado por uma instancia do apperror, pq se for, é um erro da nossa aplicação, ja conhecemos esse erro
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('🚀Server started on port 3333!');
});
