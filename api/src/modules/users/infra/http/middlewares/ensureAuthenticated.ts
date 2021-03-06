import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@configs/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  id: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError('JWT token is missing', 401);

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { id } = decoded as ITokenPayload;

    // req.user.id = id;

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
