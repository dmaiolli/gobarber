import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../errors/AppError';

import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

// Como não estamos importando o router do express como nas outras funções, temos que definir oque é oque manualmente
export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Validação do token JWT

  // Recuperando o token do cabeçalho
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  // Formato do nosso token é assim: Bearer 4d8sf418ds...
  const [type, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret); // Se der certo, vamos ter o "payload" dentro desse nosso decoded

    const { sub } = decoded as TokenPayload; // Aqui estamos forçando que nosso decoded é do tipo TokenPayload que é a nossa interface criada acima para definirmos as variáveis do objeto

    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}
