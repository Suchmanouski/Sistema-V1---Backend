const express = require('express');
const router = express.Router();
const { cadastrarContrato } = require('../Controles/contratosC');
const { autenticarToken, verificarAdmin } = require('../middleware/autenticacao');

router.post('/contratos', autenticarToken, verificarAdmin, cadastrarContrato);

module.exports = router;
