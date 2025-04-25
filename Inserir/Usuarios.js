
async function inserirUsuarios() {
  try {
    await pool.query(`
      INSERT INTO usuarios (nome, email, senha, tipo_usuario, contrato)
      VALUES 
        ('Renato', 'renato@empresa.com', '1234', 'admin', ''),
        ('Lucas Soares Lima', 'lucas@empresa.com', '1234', 'coordenador', '411'),
        ('Andrey Debiasi de Souza', 'andrey@empresa.com', '1234', 'coordenador', '3122'),
        ('Luiz Sócrates Veloso', 'luiz@empresa.com', '1234', 'coordenador', '3138'),
        ('Marcio Herrera', 'marcio@empresa.com', '1234', 'coordenador', '415');
    `);

    console.log("✅ Usuários inseridos com sucesso!");
    process.exit();
  } catch (err) {
    console.error("❌ Erro ao inserir usuários:", err);
    process.exit(1);
  }
}

inserirUsuarios();
