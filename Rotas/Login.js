const express = require('express');
const router = express.Router();

// Importando o controlador de logs
const { listarLogs } = require('../Controles/loginC');  // Certifique-se de que este arquivo existe

// Importando middlewares de autenticação
const { autenticarToken, verificarAdmin } = require('../middleware/autenticacao');

// Rota para buscar logs, somente admins podem acessar
router.get('/logs', autenticarToken, verificarAdmin, listarLogs);

module.exports = router;
