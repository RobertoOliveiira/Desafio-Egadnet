const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const NodeCache = require('node-cache');

const app = express();
const PORT = 3000;
const cache = new NodeCache({ stdTTL: 300 });

app.use(bodyParser.json());

function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (token === 'Bearer AdminEgadnet') {
    next();
  } else {
    res.status(401).json({ error: 'Token de autenticação inválido' });
  }
}

function validateCEP(req, res, next) {
  const { cep } = req.body;

  if (!cep) {
    return res.status(400).json({ error: 'CEP não informado' });
  }
  const regex = /^\d{8}$/;
  if (!regex.test(cep.replace(/[^\d]/g, ''))) {
    return res.status(400).json({ error: 'CEP deve conter 8 numeros' });
  }
  next();
  return false;
}

app.post('/cep', authenticate, validateCEP, async (req, res) => {
  const { cep } = req.body;

  const cachedData = cache.get(cep);
  if (cachedData) {
    return res.json({ ...cachedData, fromCache: true });
  }

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    if (response.data.erro) {
      res.status(404).json({ error: 'CEP não encontrado' });
    } else {
      cache.set(cep, response.data, 300);
      return res.json({ ...response.data, fromCache: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor ao buscar CEP' });
  }
  return false;
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor rodando na porta ${PORT}`);
});
