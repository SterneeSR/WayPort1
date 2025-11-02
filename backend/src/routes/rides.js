// src/routes/rides.js
const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

// list rides
router.get('/', async (req, res, next) => {
  try {
    const rides = await prisma.ride.findMany({ orderBy: { created_at: 'desc' }});
    res.json(rides);
  } catch (e) { next(e); }
});

// get ride by id
router.get('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const ride = await prisma.ride.findUnique({ where: { ride_id: id }});
    if (!ride) return res.status(404).json({ error: 'Ride not found' });
    res.json(ride);
  } catch (e) { next(e); }
});

// update status
router.patch('/:id/status', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const ride = await prisma.ride.update({ where: { ride_id: id }, data: { status }});
    res.json(ride);
  } catch (e) { next(e); }
});

module.exports = router;
