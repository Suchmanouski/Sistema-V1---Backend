const express = require('express');
const router = express.Router();
const { cadastrarContrato, listarContratos } = require('../Controles/contratosC');

router.post('/', async (req, res) => {
  await cadastrarContrato(req, res);
});

router.get('/', async (req, res) => {
  await listarContratos(req, res);
});

module.exports = router;
