// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Importação das rotas
const usuariosRoutes = require('./Rotas/Usuarios');
const contratosRoutes = require('./Rotas/Contratos');
const despesasRoutes = require('./Rotas/Despesas');
const loginRoutes = require('./Rotas/Login'); // Rota de login

app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/login', loginRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/contratos', contratosRoutes);
app.use('/despesas', despesasRoutes);

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
