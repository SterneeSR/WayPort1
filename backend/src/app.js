// src/app.js
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const ridesRoute = require('./routes/rides');
const paymentsRoute = require('./routes/payments');
const ratingsRoute = require('./routes/ratings');
const reportsRoute = require('./routes/reports');
const usersRoute = require('./routes/users');

function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use('/api/rides', ridesRoute);
  app.use('/api/payments', paymentsRoute);
  app.use('/api/ratings', ratingsRoute);
  app.use('/api/reports', reportsRoute);
  app.use('/api/users', usersRoute);

  app.get('/', (req, res) => res.json({ ok: true }));

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  });

  return app;
}

module.exports = { createApp };
