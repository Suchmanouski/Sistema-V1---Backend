const { autenticarToken, verificarAdmin } = require('../middleware/autenticacao');
const express = require('express');
const router = express.Router();
const { loginUsuario, cadastrarUsuario } = require('../Controles/usuariosC');

router.post('/login', loginUsuario);
router.post('/usuarios', autenticarToken, verificarAdmin, cadastrarUsuario);

module.exports = router;
