const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// função utilitária para registrar logs
async function registrarLog(usuario, acao, detalhes, ip) {
  try {
    await pool.query(
      'INSERT INTO logs_atividade (usuario, acao, detalhes, ip) VALUES ($1, $2, $3, $4)',
      [usuario, acao, detalhes, ip]
    );
  } catch (err) {
    console.error('❌ Erro ao registrar log:', err);
  }
}
async function loginUsuario(req, res) {
  const { nome, senha } = req.body;

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE nome = $1', [nome]);
    const usuario = result.rows[0];

    if (!usuario) return res.status(401).json({ message: 'Usuário não encontrado.' });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ message: 'Senha incorreta.' });

    const token = jwt.sign({
      id_usuario: usuario.id_usuario,
      nome: usuario.nome,
      tipo_usuario: usuario.tipo_usuario,
      contrato: usuario.contrato
    }, process.env.JWT_SECRET, { expiresIn: '4h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no login.' });
  }
}

async function cadastrarUsuario(req, res) {
  const { nome, email, senha, tipo_usuario, contrato } = req.body;

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    await pool.query(
      'INSERT INTO usuarios (nome, email, senha, tipo_usuario, contrato) VALUES ($1, $2, $3, $4, $5)',
      [nome, email, senhaCriptografada, tipo_usuario, contrato]
    );
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
  }
}

module.exports = { loginUsuario, cadastrarUsuario };
