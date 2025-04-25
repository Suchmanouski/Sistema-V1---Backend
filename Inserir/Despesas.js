const pool = require('../db');

async function inserirDespesas() {
  try {
    await pool.query(`
      INSERT INTO despesas (contrato, categoria, valor, data, observacao)
      VALUES
        ('411', 'Manutenção', 1000, '2024-01-15', 'Despesa de manutenção do contrato NEOCONSTEC'),
        ('3122', 'Serviço', 500, '2023-12-20', 'Despesa de serviço do contrato SIMEMP'),
        ('3138', 'Material', 300, '2024-02-10', 'Despesa de material para NEOCONSTEC'),
        ('415', 'Transporte', 200, '2023-10-05', 'Despesa de transporte do contrato SIMEMP');
    `);

    console.log("✅ Despesas inseridas com sucesso!");
    process.exit();
  } catch (err) {
    console.error("❌ Erro ao inserir despesas:", err);
    process.exit(1);
  }
}

inserirDespesas();
