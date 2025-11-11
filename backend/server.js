// --- Import Packages ---
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

// --- App Setup ---
const app = express();
const port = process.env.PORT || 3000;

// --- Middleware ---
app.use(cors({
  origin: '*', // later replace '*' with your Vercel frontend URL
  credentials: true,
}));
app.use(express.json());

// --- PostgreSQL Connection (Supabase) ---
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Required for Supabase SSL
});

pool.connect()
  .then(() => console.log('✅ Connected to Supabase (PostgreSQL)'))
  .catch(err => console.error('❌ DB Connection Error:', err.message));

// --- Routes ---

// Root Test
app.get('/', (req, res) => {
  res.send('🌍 Travel Agency API connected to Supabase successfully!');
});

// Fetch all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bookings ORDER BY booking_id DESC;');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error fetching bookings:', err.message);
    res.status(500).json({ message: 'Database query failed' });
  }
});

// Add new booking
app.post('/api/bookings', async (req, res) => {
  try {
    const {
      customer_name,
      email,
      phone,
      package_id,
      travel_date = new Date().toISOString().slice(0, 10),
      amount = 0,
      status = 'Pending'
    } = req.body;

    const insertQuery = `
      INSERT INTO bookings (customer_name, email, phone, package_id, travel_date, amount, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const result = await pool.query(insertQuery, [
      customer_name, email, phone, package_id, travel_date, amount, status
    ]);

    console.log('📦 New booking added:', result.rows[0]);
    res.status(201).json({ success: true, data: result.rows[0] });

  } catch (err) {
    console.error('❌ Error inserting booking:', err.message);
    res.status(500).json({ message: 'Insert failed', error: err.message });
  }
});

// --- Start Server ---
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`);
});
