async function criarTabelas() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id_usuario SERIAL PRIMARY KEY,
        nome TEXT,
        email TEXT,
        senha TEXT,
        tipo_usuario TEXT,
        contrato TEXT
      );

      CREATE TABLE IF NOT EXISTS contratos (
        id SERIAL PRIMARY KEY,
        numero TEXT,
        contratante TEXT,
        dataInicio DATE,
        dataFim DATE,
        valorInicial NUMERIC
      );

      CREATE TABLE IF NOT EXISTS despesas (
        id SERIAL PRIMARY KEY,
        contrato TEXT,
        categoria TEXT,
        valor NUMERIC,
        data DATE,
        observacao TEXT
      );

      CREATE TABLE IF NOT EXISTS logs_atividade (
        id SERIAL PRIMARY KEY,
        usuario TEXT,
        acao TEXT,
        detalhes TEXT,
        ip TEXT,
        data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Tabelas criadas com sucesso!");
    process.exit();
  } catch (err) {
    console.error("❌ Erro ao criar tabelas:", err);
    process.exit(1);
  }
}

criarTabelas();
