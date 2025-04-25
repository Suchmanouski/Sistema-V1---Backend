const express = require('express');
const router = express.Router();
const { listarLogs } = require('../Controles/LoginC'); // Ajuste para listar logs

// Rota para Listar Logs de Atividades
router.get('/', async (req, res) => {
  await listarLogs(req, res);
});

module.exports = router;
