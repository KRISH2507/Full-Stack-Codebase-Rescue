require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/user.routes');
const shipmentRoutes = require('./routes/shipment.routes');
const errorHandler = require('./middlewares/error.middleware');
const { NotFoundError } = require('./utils/errors.util');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: 'LogiTrack Backend running securely' });
});

// API Routes
app.use('/api', userRoutes);
app.use('/api/shipments', shipmentRoutes);

// Catch 404
app.use((req, res, next) => {
  next(new NotFoundError('API Route Not Found'));
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const mongoUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/logitrack';

const startServer = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true, // Fixed deprecation warnings
      useFindAndModify: false
    });
    console.log('--- DATABASE CONNECTED ---');
    
    app.listen(PORT, () => {
      console.log(`Server is alive on port ${PORT}`);
    });
  } catch (err) {
    console.error('DATABASE CONNECTION ERROR:', err);
    process.exit(1);
  }
};

startServer();

module.exports = app;