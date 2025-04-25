const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Middleware para validar admin
function verificarAdmin(req, res, next) {
  const { tipo_usuario } = req.headers;
  if (tipo_usuario !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado: apenas administradores.' });
  }
  next();
}

// ROTA LOGIN
app.post('/login', async (req, res) => {
  const { nome, senha } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE nome = $1',
      [nome]
    );

    const usuario = result.rows[0];

    if (!usuario) return res.status(401).json({ message: 'Usuário não encontrado.' });
    if (usuario.senha !== senha) return res.status(401).json({ message: 'Senha incorreta.' });

    res.json({
      id_usuario: usuario.id_usuario,
      nome: usuario.nome,
      tipo_usuario: usuario.tipo_usuario,
      contrato: usuario.contrato
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

// ROTA CADASTRO DE USUÁRIO (apenas admin)
app.post('/usuarios', verificarAdmin, async (req, res) => {
  const { nome, email, senha, tipo_usuario, contrato } = req.body;

  try {
    await pool.query(
      'INSERT INTO usuarios (nome, email, senha, tipo_usuario, contrato) VALUES ($1, $2, $3, $4, $5)',
      [nome, email, senha, tipo_usuario, contrato]
    );
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
  }
});

// ROTA PARA ADICIONAR CONTRATO (apenas admin)
app.post('/contratos', verificarAdmin, async (req, res) => {
  const { numero, contratante, dataInicio, dataFim, valorInicial } = req.body;

  try {
    await pool.query(
      'INSERT INTO contratos (numero, contratante, dataInicio, dataFim, valorInicial) VALUES ($1, $2, $3, $4, $5)',
      [numero, contratante, dataInicio, dataFim, valorInicial]
    );
    res.status(201).json({ message: 'Contrato adicionado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao adicionar contrato.' });
  }
});

// ROTA PARA ADICIONAR DESPESA (aberta a qualquer usuário autorizado)
app.post('/despesas', async (req, res) => {
  const { contrato, categoria, valor, data, observacao } = req.body;

  try {
    await pool.query(
      'INSERT INTO despesas (contrato, categoria, valor, data, observacao) VALUES ($1, $2, $3, $4, $5)',
      [contrato, categoria, valor, data, observacao]
    );
    res.status(201).json({ message: 'Despesa adicionada com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao adicionar despesa.' });
  }
});

// INICIAR SERVIDOR
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
