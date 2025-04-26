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
  let {
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

  try {
    // Conversão de "3.021.999,98" para "3021999.98"
    if (typeof valorInicial === 'string') {
      valorInicial = parseFloat(
        valorInicial.replace(/\./g, '').replace(',', '.')
      );
    }

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
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    console.error('Erro ao criar contrato:', err);
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
