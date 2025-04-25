// BackEnd/server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');            // Conexão com Postgres via db.js na mesma pasta
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Import de rotas
const loginRouter = require('./Rotas/Login');
const forgotRouter = require('./Rotas/Forgot');
const contratosRouter = require('./Rotas/Contratos');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS - permite requests do seu front
app.use(cors({
  origin: 'https://sistemav1.onrender.com',
  credentials: true
}));

// Body parser
app.use(bodyParser.json());

// Seed usuários e contratos
(async () => {
  try {
    // Usuários
    await db.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id_usuario SERIAL PRIMARY KEY,
        nome TEXT UNIQUE NOT NULL,
        email TEXT,
        senha TEXT NOT NULL,
        tipo_usuario TEXT,
        contrato TEXT
      );
    `);
    const userSeeds = [
      ['Renato Santos','renato@neoconstec.com','123456','admin',null],
      ['Glauce Dantas','glaucea@simemp.com','123456','admin',null],
      // adicione outros seeds aqui
    ];
    for (const u of userSeeds) {
      await db.query(
        `INSERT INTO usuarios (nome,email,senha,tipo_usuario,contrato)
         VALUES ($1,$2,$3,$4,$5)
         ON CONFLICT (nome) DO NOTHING;`,
        u
      );
    }
    // Contratos
    await db.query(`
      CREATE TABLE IF NOT EXISTS contratos (
        id SERIAL PRIMARY KEY,
        numero TEXT,
        contratante TEXT,
        estado TEXT,
        cidade TEXT,
        gerente TEXT,
        coordenador TEXT,
        valor_inicial NUMERIC,
        data_inicio TIMESTAMP,
        data_fim TIMESTAMP,
        status TEXT,
        tipo TEXT,
        criador TEXT,
        data_criacao TIMESTAMP DEFAULT NOW()
      );
    `);
  } catch (err) {
    console.error('Erro no seed inicial:', err);
  }
})();

// Rotas
app.use('/login', loginRouter);
app.use('/esqueci-senha', forgotRouter);
app.use('/api/contratos', contratosRouter);

// Health check
app.get('/', (req, res) => res.send('Servidor rodando com Postgres!'));

// Iniciar servidor
app.listen(PORT, () => console.log(`🚀 Servidor na porta ${PORT}`));
