// BackEnd/Rotas/Contratos.js

const express = require('express');
const db = require('../db');  // Postgres pool
const router = express.Router();

// GET /api/contratos - lista todos os contratos
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT id, numero, contratante, estado, cidade, gerente, coordenador,
              valor_inicial AS "valorInicial", data_inicio AS "dataInicio",
              data_fim AS "dataFim", status, tipo, criador, data_criacao AS "dataCriacao"
       FROM contratos
       ORDER BY id DESC`);
    res.json(rows);
  } catch (err) {
    console.error('Erro ao listar contratos:', err);
    res.status(500).json({ error: 'Erro ao listar contratos.' });
  }
});

// POST /api/contratos - cria novo contrato
router.post('/', async (req, res) => {
  const {
    numero, contratante, estado, cidade,
    gerente, coordenador, valorInicial,
    dataInicio, dataFim, status, tipo, criador
  } = req.body;

  if (!numero || !contratante) {
    return res.status(400).json({ error: 'Campos numero e contratante são obrigatórios.' });
  }

  try {
    const result = await db.query(
      `INSERT INTO contratos
         (numero, contratante, estado, cidade, gerente, coordenador,
          valor_inicial, data_inicio, data_fim, status, tipo, criador)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       RETURNING id, numero, contratante, estado, cidade, gerente, coordenador,
                 valor_inicial AS "valorInicial", data_inicio AS "dataInicio",
                 data_fim AS "dataFim", status, tipo, criador, data_criacao AS "dataCriacao"`,
      [numero, contratante, estado, cidade, gerente, coordenador,
       valorInicial, dataInicio, dataFim, status, tipo, criador]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar contrato:', err);
    res.status(500).json({ error: 'Erro ao criar contrato.' });
  }
});

module.exports = router;
