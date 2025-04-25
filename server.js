const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const usuariosRoutes = require('./routes/usuarios');
const contratosRoutes = require('./routes/contratos');
const despesasRoutes = require('./routes/despesas');

app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/', usuariosRoutes);
app.use('/', contratosRoutes);
app.use('/', despesasRoutes);

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
