import { Request, Response } from 'express';
import { getCepInfo } from '../services/cepService';

export async function getCep(req: Request, res: Response) {
  const { cep } = req.body;

  try {
    const cepInfo = await getCepInfo(cep);
    res.json(cepInfo);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor ao buscar CEP' });
  }
}
