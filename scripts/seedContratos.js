// BackEnd/scripts/seedContratos.js
const db = require('../db');

(async () => {
  try {
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
        tipo           TEXT
      );
    `);
    console.log('✅ Tabela contratos criada (ou já existia).');
  } catch (err) {
    console.error('❌ Erro ao criar tabela contratos:', err);
  } finally {
    process.exit();
  }
})();
