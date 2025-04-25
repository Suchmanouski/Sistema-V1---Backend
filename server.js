const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Corrigido: caminhos reais com letras maiúsculas
const usuariosRoutes = require('./Rotas/Usuarios');
const contratosRoutes = require('./Rotas/Contratos');
const despesasRoutes = require('./Rotas/Despesas');
const logsRoutes = require('./Rotas/Login'); // certifique-se de que Logs.js existe

app.use(cors());
app.use(bodyParser.json());

// Rotas principais
app.use('/', usuariosRoutes);
app.use('/', contratosRoutes);
app.use('/', despesasRoutes);
app.use('/', logsRoutes);

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
