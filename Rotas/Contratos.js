// BackEnd/Rotas/Contratos.js

const express = require('express');
const pgdb = require('../db'); // <-- Corrigido: usar db.js que é o módulo certo
const router = express.Router();

// GET /api/contratos — lista todos os contratos
router.get('/', async (req, res) => {
  try {
    const { rows } = await pgdb.query(
      'SELECT * FROM contratos ORDER BY id DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error('❌ Erro ao listar contratos:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/contratos — adiciona um novo contrato
router.post('/', async (req, res) => {
  const {
    numero,
    contratante,
    estado,
    cidade,
    gerente,
    coordenador,
    valorInicial,
    dataInicio,
    dataFim,
    status,
    tipo,
    criador
  } = req.body;

  if (!numero || !contratante || !valorInicial) {
    return res.status(400).json({ message: 'Campos obrigatórios ausentes.' });
  }

  try {
    const result = await pgdb.query(
      `INSERT INTO contratos
        (numero, contratante, estado, cidade, gerente, coordenador,
         valor_inicial, data_inicio, data_fim, status, tipo, criador)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       RETURNING id`,
      [
        numero,
        contratante,
        estado,
        cidade,
        gerente,
        coordenador,
        valorInicial,
        dataInicio,
        dataFim,
        status,
        tipo,
        criador
      ]
    );
    res.status(201).json({ message: 'Contrato salvo com sucesso!', id: result.rows[0].id });
  } catch (err) {
    console.error('❌ Erro ao salvar contrato:', err);
    res.status(500).json({ message: 'Erro ao salvar contrato.', error: err.message });
  }
});

module.exports = router;
