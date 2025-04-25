const express = require('express');
const router = express.Router();
const { cadastrarDespesa } = require('../Controles/despesasC'); // Ajuste conforme necessário

// Rota para Cadastrar Despesa
router.post('/', async (req, res) => {
  await cadastrarDespesa(req, res);
});

// Rota para Listar Despesas
router.get('/', async (req, res) => {
  await listarDespesas(req, res); // Ajuste para listar despesas, se necessário
});

module.exports = router;
