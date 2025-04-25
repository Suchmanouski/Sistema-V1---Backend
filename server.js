require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');         // conexão PostgreSQL via PG Pool
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Rotas específicas
const contratosRouter = require('./Rotas/Contratos');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuração CORS para seu front-end
app.use(cors({
  origin: 'https://sistemav1.onrender.com',  // corrige domínio sem espaço
  credentials: true
}));

// Body parsing
app.use(bodyParser.json());

// --- Seed inicial de usuários ---
(async () => {
  try {
    await db.query('DROP TABLE IF EXISTS usuarios;');
    await db.query(`
      CREATE TABLE usuarios (
        id_usuario   SERIAL PRIMARY KEY,
        nome         TEXT UNIQUE NOT NULL,
        email        TEXT,
        senha        TEXT NOT NULL,
        tipo_usuario TEXT,
        contrato     TEXT
      );
    `);
    const seeds = [
      ['Renato Santos','renato@neoconstec.com','123456','admin',null],
      ['Glauce Dantas','glaucea@simemp.com','123456','admin',null],
      ['Lucas Soares Lima','lucaslima@gmail.com','123456','coordenador','411'],
      ['Gerrard Suchmanouski','gerrardsuchmaouskisilva@gmail.com','123456','admin',null],
      ['Andrey Debiasi de Souza','andrey@gmail.com','123456','coordenador','3122'],
      ['Luiz Sócrates Veloso','luiz@gmail.com','123456','coordenador','3138'],
      ['Marcio Herrera','marcio@gmail.com','123456','coordenador','415'],
      ['Kleber Ubirajara','kleber@empresa.com','123456','financeiro',null]
    ];
    for (const u of seeds) {
      await db.query(
        `INSERT INTO usuarios (nome,email,senha,tipo_usuario,contrato) VALUES ($1,$2,$3,$4,$5);`,
        u
      );
    }
    console.log('✅ Usuarios seed OK');
  } catch (err) {
    console.error('Erro seed usuarios:', err);
  }
})();

// Rotas de login
app.post('/login', async (req, res) => {
  const { nome, senha } = req.body;
  if (!nome || !senha) return res.status(400).json({ message: 'Nome e senha são obrigatórios.' });
  try {
    const { rows } = await db.query(
      'SELECT id_usuario,nome,tipo_usuario,contrato,senha FROM usuarios WHERE nome=$1',[nome]
    );
    const user = rows[0];
    if (!user) return res.status(401).json({ message: 'Usuário não encontrado.' });
    if (user.senha !== senha) return res.status(401).json({ message: 'Senha incorreta.' });
    delete user.senha;
    res.json(user);
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

// Esqueci senha
app.post('/esqueci-senha', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email é obrigatório.' });
  const transporter = nodemailer.createTransport({/*...*/});
  const mailOptions = {/*...*/};
  transporter.sendMail(mailOptions, (erro) => {
    if (erro) {
      console.error('Erro envio email:', erro);
      return res.status(500).json({ message: 'Erro ao enviar e-mail.' });
    }
    res.json({ message: 'E-mail enviado com sucesso!' });
  });
});

// Rotas de contratos
app.use('/api/contratos', contratosRouter);

// Rota raiz
app.get('/', (req, res) => res.send('Servidor rodando com Postgres!'));

// Inicia servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
