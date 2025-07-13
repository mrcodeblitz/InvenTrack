const express = require('express');
const router = express.Router();
const pool = require('../db');

// @desc    List vehicles
// @route   GET /api/vehicles
// @access  Public
router.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  try {
    const result = await pool.query(
      `SELECT id, registration_number, asset_type, entry_datetime
       FROM vehicles
       ORDER BY entry_datetime DESC
       LIMIT $1`, [limit]
    );
    res.json({ vehicles: result.rows });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Add new vehicle
// @route   POST /api/vehicles
// @access  Public
router.post('/', async (req, res) => {
  const {
    registration_number,    asset_type,
    asset,
    bank_name,
    serial_number,
    entry_datetime,
    borrower_name,
    engine_number,
    chassis_number,
    mileage,
    condition,
    description
  } = req.body;

  console.log(req.body);
  try {
    await pool.query(
      `INSERT INTO vehicles (
        registration_number,       
        asset,
        bank_name,
        serial_number,
        entry_datetime,
        borrower_name,
        engine_number,
        chassis_number,
        mileage,
        condition,
        description
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,

      [
        registration_number,
        asset,
        bank_name,
        serial_number,
        entry_datetime,
        borrower_name,
        engine_number,
        chassis_number,
        mileage,
        condition,
        description
      ]
    );
    res.json({ message: 'Vehicle entry saved' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Count vehicles
// @route   GET /api/vehicles/count
// @access  Public
router.get('/count', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM vehicles');
    res.json({ count: parseInt(result.rows[0].count, 10) });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Search vehicles by registration number
// @route   GET /api/vehicles/search
// @access  Public
router.get('/search', async (req, res) => {
  const { registration_number } = req.query;
  console.log('input:', registration_number)
  try {
    const result = await pool.query(
      'SELECT * FROM vehicles WHERE registration_number = $1',
      [registration_number]
    );
    res.json({ vehicles: result.rows });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get vehicle details
// @route   GET /api/vehicles/:id
// @access  Public

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM vehicles WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json({ vehicle: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update vehicle
// @route   PUT /api/vehicles/:id
// @access  Public
router.put('/:id', (req, res) => {
  // Logic to update vehicle
});

// @desc    Mark vehicle as exited
// @route   POST /api/vehicles/:id/exit
// @access  Public
router.post('/:id/exit', (req, res) => {
  // Logic to mark vehicle as exited
});



module.exports = router;