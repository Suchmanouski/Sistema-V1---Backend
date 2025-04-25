const express = require('express');
const router = express.Router();
const { cadastrarContrato } = require('../controllers/contratosController');
const { autenticarToken, verificarAdmin } = require('../middleware/autenticacao');

router.post('/contratos', autenticarToken, verificarAdmin, cadastrarContrato);

module.exports = router;
