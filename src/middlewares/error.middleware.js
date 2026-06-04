const { AppError } = require('../utils/errors.util');

/**
 * Global error handling middleware.
 * @param {Error} err - The error object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message, status: 'error' });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(422).json({ error: err.message, status: 'error' });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(409).json({ error: 'Duplicate resource conflict', status: 'error' });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token', status: 'error' });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token expired', status: 'error' });
  }

  res.status(500).json({ error: 'Internal server error', status: 'error' });
};

module.exports = errorHandler;