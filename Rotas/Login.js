const express = require('express');
const router = express.Router();
const { listarLogs } = require('../Controles/loginC');
const { autenticarToken, verificarAdmin } = require('../middleware/autenticacao');

router.get('/logs', autenticarToken, verificarAdmin, listarLogs);

module.exports = router;
