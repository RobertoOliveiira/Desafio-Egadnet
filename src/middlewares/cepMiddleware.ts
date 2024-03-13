import { Request, Response, NextFunction } from 'express';

export function validateCEP(req: Request, res: Response, next: NextFunction) {
  const { cep } = req.body;

  if (!cep) {
    return res.status(400).json({ error: 'CEP não informado' });
  }

  const regex = /^\d{8}$/;
  if (!regex.test(cep.replace(/[^\d]/g, ''))) {
    return res.status(400).json({ error: 'CEP deve conter 8 números' });
  }

  next();
}
