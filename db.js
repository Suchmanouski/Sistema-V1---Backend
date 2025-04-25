const { Pool } = require('pg');
require('dotenv').config();  // Carregar variáveis de ambiente do .env

// Configuração do pool de conexões com o banco de dados PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // A URL do banco que você configurar no Render
  ssl: {
    rejectUnauthorized: false  // Para aceitar conexões seguras, se necessário
  }
});

module.exports = pool;  // Exportando o pool para uso em outros arquivos
