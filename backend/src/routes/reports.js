// src/routes/reports.js
const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

router.post('/', async (req, res, next) => {
  try {
    const { user_id, ride_id, category, message } = req.body;
    const report = await prisma.report.create({ data: { userId: user_id, rideId: ride_id, category, message }});
    res.status(201).json(report);
  } catch (e) { next(e); }
});

router.get('/support', (req, res) => {
  res.json({ phone: '+91-XXXXXXXXXX' });
});

module.exports = router;
