const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const usuariosRoutes = require('./Rotas/Usuarios');
const contratosRoutes = require('./Rotas/Contratos');
const despesasRoutes = require('./Rotas/Despesas');
const logsRoutes = require('./Rotas/Login');

app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/usuarios', usuariosRoutes);
app.use('/contratos', contratosRoutes);
app.use('/despesas', despesasRoutes);
app.use('/login', logsRoutes);

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
