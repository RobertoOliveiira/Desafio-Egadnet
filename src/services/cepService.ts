import axios from 'axios';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 300 });

export async function getCepInfo(cep: string) {
  const cachedData = cache.get(cep) as any;
  if (cachedData) {
    return { ...cachedData, fromCache: true };
  }

  const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
  const cepInfo = response.data;

  if (cepInfo.erro) {
    throw new Error('CEP não encontrado');
  }

  cache.set(cep, cepInfo, 300);
  return { ...cepInfo, fromCache: false };
}
