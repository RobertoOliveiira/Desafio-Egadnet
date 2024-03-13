import { Request, Response, NextFunction } from 'express';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (token === 'Bearer AdminEgadnet') {
    next();
  } else {
    res.status(401).json({ error: 'Token de autenticação inválido' });
  }
}