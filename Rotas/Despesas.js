const express = require('express');
const router = express.Router();
const { cadastrarDespesa } = require('../controllers/despesasController');
const { autenticarToken } = require('../middleware/autenticacao');

router.post('/despesas', autenticarToken, cadastrarDespesa);

module.exports = router;
