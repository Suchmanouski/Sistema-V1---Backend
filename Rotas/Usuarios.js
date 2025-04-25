const express = require('express');
const router = express.Router();
const { loginUsuario, cadastrarUsuario } = require('../Controles/usuariosC');
const { autenticarToken, verificarAdmin } = require('../middleware/autenticacao');

router.post('/login', loginUsuario);
router.post('/usuarios', autenticarToken, verificarAdmin, cadastrarUsuario);

module.exports = router;
