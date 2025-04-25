const pool = require('../db');

async function inserirContratos() {
  try {
    await pool.query(`
      INSERT INTO contratos (numero, contratante, dataInicio, dataFim, valorInicial)
      VALUES
        ('411', 'NEOCONSTEC', '2024-01-01', '2025-12-31', 100000),
        ('3122', 'SIMEMP', '2023-05-01', '2025-04-30', 80000),
        ('3138', 'NEOCONSTEC', '2024-06-01', '2026-05-31', 120000),
        ('415', 'SIMEMP', '2023-09-01', '2025-08-31', 60000);
    `);

    console.log("✅ Contratos inseridos com sucesso!");
    process.exit();
  } catch (err) {
    console.error("❌ Erro ao inserir contratos:", err);
    process.exit(1);
  }
}

inserirContratos();
