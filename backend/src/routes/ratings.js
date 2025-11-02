// src/routes/ratings.js
const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

router.post('/', async (req, res, next) => {
  try {
    const { ride_id, rater_id, ratee_id, rating_value, feedback_text } = req.body;
    const rating = await prisma.rating.create({ data: { rideId: ride_id, raterId: rater_id, rateeId: ratee_id, rating_value, feedback_text }});
    res.status(201).json(rating);
  } catch (e) { next(e); }
});

module.exports = router;
