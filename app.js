const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.post('/cep', async (req, res) => {
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
