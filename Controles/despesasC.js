const pool = require('../db');

// Função para cadastrar uma nova despesa
async function cadastrarDespesa(req, res) {
  const { contrato, categoria, valor, data, observacao } = req.body;

  try {
    await pool.query(
      'INSERT INTO despesas (contrato, categoria, valor, data, observacao) VALUES ($1, $2, $3, $4, $5)',
      [contrato, categoria, valor, data, observacao]
    );
    res.status(201).json({ message: 'Despesa adicionada com sucesso!' });
  } catch (err) {
    console.error('❌ Erro ao adicionar despesa:', err);
    res.status(500).json({ message: 'Erro ao adicionar despesa.' });
  }
}

// Função para listar todas as despesas
async function listarDespesas(req, res) {
  try {
    const resultado = await pool.query('SELECT * FROM despesas');
    res.json(resultado.rows);
  } catch (err) {
    console.error('❌ Erro ao listar despesas:', err);
    res.status(500).json({ message: 'Erro ao listar despesas.' });
  }
}

module.exports = { cadastrarDespesa, listarDespesas };
