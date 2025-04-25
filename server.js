import 'dotenv/config'
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const dbFile = './gastos.db';
const db = new sqlite3.Database(dbFile);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INTEGER PRIMARY KEY,
    nome TEXT,
    email TEXT,
    senha TEXT,
    tipo_usuario TEXT,
    contrato TEXT
  )`);

  db.get("SELECT COUNT(*) as count FROM usuarios", (err, row) => {
    if (row.count === 0) {
      const stmt = db.prepare("INSERT INTO usuarios (id_usuario, nome, email, senha, tipo_usuario, contrato) VALUES (?, ?, ?, ?, ?, ?)");

      stmt.run(1, 'Renato', 'renato@neoconstec.com', '123456', 'admin', null);
      stmt.run(2, 'Gláucea', 'glaucea@simemp.com', '123456', 'admin', null);
      stmt.run(3, 'Lucas Soares Lima', 'lucaslima@gmail.com', '123456', 'coordenador', '411');
      stmt.run(4, 'Gerrard Suchmanouski', 'gerrardsuchmaouskisilva@gmail.com', '123456', 'admin', null);
      stmt.run(5, 'Andrey Debiasi de Souza', 'andrey@gmail.com', '123456', 'coordenador', '3122');
      stmt.run(6, 'Luiz Sócrates Veloso', 'luiz@gmail.com', '123456', 'coordenador', '3138');
      stmt.run(7, 'Marcio Herrera', 'marcio@gmail.com', '123456', 'coordenador', '415');

      stmt.finalize();
      console.log('Usuários iniciais inseridos!');
    }
  });
});

app.post('/login', (req, res) => {
  const { nome, senha } = req.body;

  if (!nome || !senha) {
    return res.status(400).json({ message: 'Nome e senha são obrigatórios.' });
  }

  db.get("SELECT * FROM usuarios WHERE nome = ?", [nome], (err, usuario) => {
    if (err) {
      return res.status(500).json({ message: 'Erro no servidor.' });
    }

    if (!usuario) {
      return res.status(401).json({ message: 'Usuário não encontrado.' });
    }

    if (usuario.senha !== senha) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    return res.json({
      id_usuario: usuario.id_usuario,
      nome: usuario.nome,
      tipo_usuario: usuario.tipo_usuario,
      contrato: usuario.contrato || null
    });
  });
});

app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
const nodemailer = require('nodemailer');

app.post('/esqueci-senha', (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email é obrigatório.' });

  // Aqui você poderia validar se o email existe no banco de dados

  const transporter = nodemailer.createTransport({
    service: 'gmail', // ou outro provedor SMTP
    auth: {
      user: 'seuemail@gmail.com',
      pass: 'suasenhaouappkey' // use App Password se for Gmail
    }
  });

  const mailOptions = {
    from: 'seuemail@gmail.com',
    to: email,
    subject: 'Redefinição de Senha - Sistema Simemp',
    html: `
      <h3>Redefinição de Senha</h3>
      <p>Recebemos uma solicitação para redefinir sua senha.</p>
      <p>Clique no link abaixo para continuar:</p>
      <a href="http://localhost:3000/redefinir-senha?email=${encodeURIComponent(email)}">Redefinir Senha</a>
    `
  };

  transporter.sendMail(mailOptions, (erro, info) => {
    if (erro) {
      console.log(erro);
      return res.status(500).json({ message: 'Erro ao enviar o e-mail.' });
    }
    res.json({ message: 'E-mail enviado com sucesso!' });
  });
});
