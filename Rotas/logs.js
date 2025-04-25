const express = require('express');
const router = express.Router();
const { autenticarUsuario } = require('../Controles/LoginC');

router.post('/', async (req, res) => {
  await autenticarUsuario(req, res);
});

module.exports = router;
