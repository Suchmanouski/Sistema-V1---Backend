
const pool = require('../db');
// função utilitária para registrar logs
async function registrarLog(usuario, acao, detalhes, ip) {
  try {
    await pool.query(
      'INSERT INTO logs_atividade (usuario, acao, detalhes, ip) VALUES ($1, $2, $3, $4)',
      [usuario, acao, detalhes, ip]
    );
  } catch (err) {
    console.error('❌ Erro ao registrar log:', err);
  }
}
async function cadastrarDespesa(req, res) {
  const { contrato, categoria, valor, data, observacao } = req.body;

  try {
    await pool.query(
      'INSERT INTO despesas (contrato, categoria, valor, data, observacao) VALUES ($1, $2, $3, $4, $5)',
      [contrato, categoria, valor, data, observacao]
    );
    res.status(201).json({ message: 'Despesa adicionada com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao adicionar despesa.' });
  }
}

module.exports = { cadastrarDespesa };
