const express = require('express');
const router = express.Router();
const { cadastrarContrato } = require('../Controles/contratosC'); // Atualize com a função correta

// Rota para Cadastrar Contrato
router.post('/', async (req, res) => {
  await cadastrarContrato(req, res);
});

// Rota para Listar Contratos
router.get('/', async (req, res) => {
  await listarContratos(req, res); // Ajuste para listar contratos, se necessário
});

module.exports = router;
