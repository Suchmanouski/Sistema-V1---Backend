const pool = require('../db');

// Função para cadastrar um novo usuário
async function cadastrarUsuario(req, res) {
  const { nome, email, senha, tipo_usuario, contrato } = req.body;

  try {
    await pool.query(
      'INSERT INTO usuarios (nome, email, senha, tipo_usuario, contrato) VALUES ($1, $2, $3, $4, $5)',
      [nome, email, senha, tipo_usuario, contrato]
    );
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (err) {
    console.error('❌ Erro ao cadastrar usuário:', err);
    res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
  }
}

// Função para listar todos os usuários
async function listarUsuarios(req, res) {
  try {
    const resultado = await pool.query('SELECT * FROM usuarios');
    res.json(resultado.rows);
  } catch (err) {
    console.error('❌ Erro ao listar usuários:', err);
    res.status(500).json({ message: 'Erro ao listar usuários.' });
  }
}

module.exports = { cadastrarUsuario, listarUsuarios };
