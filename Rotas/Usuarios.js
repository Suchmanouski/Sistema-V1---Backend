const express = require('express');
const router = express.Router();
const { cadastrarUsuario } = require('../Controles/usuariosC'); // Atualize com a função correta

// Rota de Cadastro de Usuário
router.post('/', async (req, res) => {
  await cadastrarUsuario(req, res);
});

module.exports = router;
