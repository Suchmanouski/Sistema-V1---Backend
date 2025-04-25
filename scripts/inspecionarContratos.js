// BackEnd/scripts/inspecionarContratos.js
const pgdb = require('../pgdb');

(async () => {
  try {
    const { rows } = await pgdb.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'contratos';
    `);
    console.table(rows);
  } catch (err) {
    console.error('❌ Erro ao inspecionar contratos:', err);
  } finally {
    process.exit();
  }
})();
