// db.js
import pkg from 'pg'
// já pegou o dotenv lá em server.js, então:
const { Pool } = pkg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

export default {
  query: (text, params) => pool.query(text, params)
}
