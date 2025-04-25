const pool = require('../db');

async function autenticarUsuario(req, res) {
  const { email, senha } = req.body;
  try {
    const resultado = await pool.query('SELECT * FROM usuarios WHERE email = $1 AND senha = $2', [email, senha]);
    if (resultado.rows.length > 0) {
      res.status(200).json({ message: 'Login bem-sucedido', usuario: resultado.rows[0] });
    } else {
      res.status(401).json({ message: 'Email ou senha incorretos' });
    }
  } catch (err) {
    console.error('❌ Erro no login:', err);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
}

module.exports = { autenticarUsuario };
