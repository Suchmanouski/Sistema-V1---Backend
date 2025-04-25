
const pool = require('../db');
async function listarLogs(req, res) {
  try {
    const resultado = await pool.query(
      'SELECT * FROM logs_atividade ORDER BY data DESC'
    );
    res.json(resultado.rows);
  } catch (err) {
    console.error('❌ Erro ao listar logs:', err);
    res.status(500).json({ message: 'Erro ao buscar logs.' });
  }
}

module.exports = { listarLogs };
