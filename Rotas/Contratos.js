// BackEnd/Rotas/Login.js
const express = require('express');
const db      = require('../db');
const router  = express.Router();

router.post('/', async (req, res) => {
  const { nome, senha } = req.body;
  if (!nome || !senha) return res.status(400).json({ message: 'Nome e senha obrigatórios.' });

  try {
    const { rows } = await db.query(
      'SELECT id_usuario, nome, tipo_usuario, contrato, senha FROM usuarios WHERE nome = $1',
      [nome]
    );
    const user = rows[0];
    if (!user) return res.status(401).json({ message: 'Usuário não encontrado.' });
    if (user.senha !== senha) return res.status(401).json({ message: 'Senha incorreta.' });

    // retira a senha antes de devolver
    delete user.senha;
    res.json(user);
  } catch (e) {
    console.error('Erro no login:', e);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

module.exports = router;
