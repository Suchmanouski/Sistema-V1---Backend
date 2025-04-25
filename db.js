db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id_usuario INTEGER PRIMARY KEY,
      nome TEXT UNIQUE,
      email TEXT,
      senha TEXT,
      tipo_usuario TEXT,
      contrato TEXT
    )
  `);

  const stmt = db.prepare(`
    INSERT OR IGNORE INTO usuarios
      (id_usuario, nome, email, senha, tipo_usuario, contrato)
    VALUES ($1,$2,$3,$4,$5,$6)
  `);

  const seeds = [
    [1, 'Renato Santos',      'renato@neoconstec.com',       '123456', 'admin',       null],
    [2, 'Glauce Dantas',      'glaucea@simemp.com',          '123456', 'admin',       null],
    [3, 'Lucas Soares Lima',  'lucaslima@gmail.com',         '123456', 'coordenador', '411'],
    [4, 'Gerrard Suchmanouski','gerrardsuchmaouskisilva@gmail.com','123456','admin',null],
    [5, 'Andrey Debiasi de Souza','andrey@gmail.com',          '123456','coordenador','3122'],
    [6, 'Luiz Sócrates Veloso','luiz@gmail.com',             '123456','coordenador','3138'],
    [7, 'Marcio Herrera',     'marcio@gmail.com',            '123456','coordenador','415'],
    [8, 'Kleber Ubirajara',   'kleber@empresa.com',          '123456','financeiro', null],
    // <-- aqui seu novo usuário:
    [9, 'João da Silva',      'joao@empresa.com',            'senha123','coordenador','5001']
  ];

  for (const u of seeds) {
    stmt.run(...u);
  }
  stmt.finalize();
  console.log('✅ Usuários inseridos (INSERT OR IGNORE)');
});
