const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (token === 'Bearer AdminEgadnet') {
    next();
  } else {
    res.status(401).json({ error: 'Token de autenticação inválido' });
  }
}

app.post('/cep', authenticate, async (req, res) => {
  const { cep } = req.body;

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    if (response.data.erro) {
      res.status(404).json({ error: 'CEP não encontrado' });
    } else {
      return res.json(response.data);
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
