const express = require('express');
const router = express.Router();
const { autenticarUsuario } = require('../Controles/LoginC');

// Rota de login via POST
router.post('/', async (req, res) => {
  await autenticarUsuario(req, res);
});

module.exports = router;
