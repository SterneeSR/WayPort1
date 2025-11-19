// src/routes/payments.js
const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const io = global._io;


router.post('/', async (req, res, next) => {
  try {
    const { ride_id, payer_id, payee_id, amount, payment_method, status='Success' } = req.body;
    const payment = await prisma.payment.create({
      data: { rideId: ride_id, payerId: payer_id, payeeId: payee_id, amount, payment_method, status }
    });

    // update ride status
    await prisma.ride.update({ where: { ride_id }, data: { status: 'Payment_Done' }});

    // broadcast
    if (io) io.emit('payment:updated', { ride_id, status });

    res.status(201).json(payment);
  } catch (e) { next(e); }
});

module.exports = router;
