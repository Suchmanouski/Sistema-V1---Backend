const express = require('express');
const router = express.Router();
const { cadastrarDespesa, listarDespesas } = require('../Controles/despesasC');

router.post('/', async (req, res) => {
  await cadastrarDespesa(req, res);
});

router.get('/', async (req, res) => {
  await listarDespesas(req, res);
});

module.exports = router;
