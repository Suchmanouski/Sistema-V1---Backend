const pool = require('../db');

// Função para cadastrar um novo contrato
async function cadastrarContrato(req, res) {
  const { numero, contratante, dataInicio, dataFim, valorInicial } = req.body;

  try {
    await pool.query(
      'INSERT INTO contratos (numero, contratante, dataInicio, dataFim, valorInicial) VALUES ($1, $2, $3, $4, $5)',
      [numero, contratante, dataInicio, dataFim, valorInicial]
    );
    res.status(201).json({ message: 'Contrato adicionado com sucesso!' });
  } catch (err) {
    console.error('❌ Erro ao adicionar contrato:', err);
    res.status(500).json({ message: 'Erro ao adicionar contrato.' });
  }
}

// Função para listar todos os contratos
async function listarContratos(req, res) {
  try {
    const resultado = await pool.query('SELECT * FROM contratos');
    res.json(resultado.rows);
  } catch (err) {
    console.error('❌ Erro ao listar contratos:', err);
    res.status(500).json({ message: 'Erro ao listar contratos.' });
  }
}

module.exports = { cadastrarContrato, listarContratos };
