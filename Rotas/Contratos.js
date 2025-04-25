const express = require('express');
const pgdb    = require('../db');
const router  = express.Router();

// GET /api/contratos?page=&limit=
router.get('/', async (req, res) => {
  const page  = parseInt(req.query.page)  || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;
  try {
    const { rows } = await pgdb.query(
      `SELECT * 
         FROM contratos
        ORDER BY id DESC
        OFFSET $1 LIMIT $2`,
      [offset, limit]
    );
    res.json(rows);
  } catch (err) {
    console.error('Erro ao listar contratos paginados:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/contratos
router.post('/', async (req, res) => {
  let {
    numero, contratante, estado, cidade,
    gerente, coordenador, valorInicial,
    dataInicio, dataFim, status, tipo, criador
  } = req.body;
  // converter valor e datas como antes...
  valorInicial = typeof valorInicial === 'string'
    ? parseFloat(valorInicial.replace(/\./g,'').replace(',','.'))
    : valorInicial;
  // data conversion...
  const toDBDate = d => {
    if (!d) return null;
    const [day, mon, yr] = d.split('/');
    return `${yr}-${mon}-${day}`;
  };
  dataInicio = toDBDate(dataInicio);
  dataFim    = toDBDate(dataFim);
  try {
    const result = await pgdb.query(
      `INSERT INTO contratos
         (numero, contratante, estado, cidade, gerente, coordenador,
          valor_inicial, data_inicio, data_fim, status, tipo, criador)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       RETURNING id`,
      [numero, contratante, estado, cidade, gerente, coordenador,
       valorInicial, dataInicio, dataFim, status, tipo, criador]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    console.error('Erro ao criar contrato:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/contratos/:id
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  let {
    numero, contratante, estado, cidade,
    gerente, coordenador, valorInicial,
    dataInicio, dataFim, status, tipo, criador
  } = req.body;
  // mesmíssimas conversões:
  valorInicial = typeof valorInicial === 'string'
    ? parseFloat(valorInicial.replace(/\./g,'').replace(',','.'))
    : valorInicial;
  const toDBDate = d => {
    if (!d) return null;
    const [day, mon, yr] = d.split('/');
    return `${yr}-${mon}-${day}`;
  };
  dataInicio = toDBDate(dataInicio);
  dataFim    = toDBDate(dataFim);
  try {
    await pgdb.query(
      `UPDATE contratos
         SET numero=$1, contratante=$2, estado=$3, cidade=$4,
             gerente=$5, coordenador=$6, valor_inicial=$7,
             data_inicio=$8, data_fim=$9, status=$10, tipo=$11, criador=$12
       WHERE id = $13`,
      [numero, contratante, estado, cidade,
       gerente, coordenador, valorInicial,
       dataInicio, dataFim, status, tipo, criador,
       id]
    );
    res.json({ message: 'Contrato atualizado com sucesso!' });
  } catch (err) {
    console.error('Erro ao atualizar contrato:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/contratos/:id
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await pgdb.query('DELETE FROM contratos WHERE id = $1', [id]);
    res.json({ message: 'Contrato excluído com sucesso!' });
  } catch (err) {
    console.error('Erro ao excluir contrato:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
