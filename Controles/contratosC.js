const pool = require('../db');
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
async function cadastrarContrato(req, res) {
  const { numero, contratante, dataInicio, dataFim, valorInicial } = req.body;

  try {
    await pool.query(
      'INSERT INTO contratos (numero, contratante, dataInicio, dataFim, valorInicial) VALUES ($1, $2, $3, $4, $5)',
      [numero, contratante, dataInicio, dataFim, valorInicial]
    );
    res.status(201).json({ message: 'Contrato adicionado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao adicionar contrato.' });
  }
}

module.exports = { cadastrarContrato };
