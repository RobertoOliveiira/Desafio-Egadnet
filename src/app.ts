import express from 'express';
import bodyParser from 'body-parser';
import { getCep } from './controllers/cepController';
import { authenticate } from './middlewares/authMiddleware';
import { validateCEP } from './middlewares/cepMiddleware';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/cep', authenticate, validateCEP, getCep);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
