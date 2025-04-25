require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');         // Conexão com Postgres via db.js
const nodemailer = require('nodemailer');

const contratosRouter = require('./Rotas/Contratos');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuração CORS para seu front-end
app.use(cors({
  origin: 'https://sistemav1.onrender.com',
  credentials: true
}));

// Body parser
app.use(bodyParser.json());

// --- Seed inicial de usuários e contratos ---
(async () => {
  try {
    // Tabela usuarios
    await db.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id_usuario   SERIAL PRIMARY KEY,
        nome         TEXT UNIQUE NOT NULL,
        email        TEXT,
        senha        TEXT NOT NULL,
        tipo_usuario TEXT,
        contrato     TEXT
      );
    `);
    // Tabela contratos
    await db.query(`
      CREATE TABLE IF NOT EXISTS contratos (
        id             SERIAL PRIMARY KEY,
        numero         TEXT,
        contratante    TEXT,
        estado         TEXT,
        cidade         TEXT,
        gerente        TEXT,
        coordenador    TEXT,
        valor_inicial  NUMERIC,
        data_inicio    TIMESTAMP,
        data_fim       TIMESTAMP,
        status         TEXT,
        tipo           TEXT,
        criador        TEXT,
        data_criacao   TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Tabelas usuarios e contratos verificadas/criadas');
  } catch (err) {
    console.error('❌ Erro no seed inicial:', err);
  }
})();

// --- Rotas ---
// Login
app.post('/login', async (req, res) => {
  const { nome, senha } = req.body;
  if (!nome || !senha) return res.status(400).json({ message: 'Nome e senha são obrigatórios.' });

  try {
    const { rows } = await db.query(
      'SELECT id_usuario, nome, tipo_usuario, contrato, senha FROM usuarios WHERE nome = $1',
      [nome]
    );
    const user = rows[0];
    if (!user) return res.status(401).json({ message: 'Usuário não encontrado.' });
    if (user.senha !== senha) return res.status(401).json({ message: 'Senha incorreta.' });

    delete user.senha;
    res.json(user);
  } catch (err) {
    console.error('❌ Erro no login:', err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

// Esqueci senha
app.post('/esqueci-senha', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email é obrigatório.' });

  // Envie email de redefinição
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'seuemail@gmail.com',
      pass: 'suasenhaouappkey'
    }
  });

  const mailOptions = {
    from: 'seuemail@gmail.com',
    to: email,
    subject: 'Redefinição de Senha - Sistema Simemp',
    html: `<h3>Redefinição de Senha</h3>
           <p>Clique no link abaixo para continuar:</p>
           <a href="https://sistemav1.onrender.com/redefinir-senha?email=${encodeURIComponent(email)}">Redefinir Senha</a>`
  };

  transporter.sendMail(mailOptions, (erro) => {
    if (erro) {
      console.error('❌ Erro ao enviar e-mail:', erro);
      return res.status(500).json({ message: 'Erro ao enviar o e-mail.' });
    }
    res.json({ message: 'E-mail enviado com sucesso!' });
  });
});

// Rotas de Contratos (API REST)
app.use('/api/contratos', contratosRouter);

// Health check
app.get('/', (req, res) => res.send('Servidor rodando com Postgres!'));

// Start server
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
