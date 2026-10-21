import express from 'express';
import mysql from 'mysql2/promise';

// Même base MySQL que le plugin (table urys_players).
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'urys',
  connectionLimit: 5,
});

const app = express();

app.get('/api/leaderboard/boxing', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT name, elo, wins, losses FROM urys_players ORDER BY elo DESC, wins DESC LIMIT 10'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db_error' });
  }
});

const port = Number(process.env.PORT || 3001);
app.listen(port, () => console.log('API urys.cc sur le port ' + port));
