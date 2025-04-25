const express = require('express');
const router = express.Router();
const { cadastrarUsuario, listarUsuarios } = require('../Controles/usuariosC');

router.post('/', async (req, res) => {
  await cadastrarUsuario(req, res);
});

router.get('/', async (req, res) => {
  await listarUsuarios(req, res);
});

module.exports = router;
