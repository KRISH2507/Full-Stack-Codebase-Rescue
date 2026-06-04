const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/errors.util');
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

/**
 * Authentication middleware to verify JWT tokens.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @throws {UnauthorizedError} if token is missing or invalid.
 */
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return next(new UnauthorizedError('Missing authentication token'));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    next(new UnauthorizedError('Invalid or expired token'));
  }
};

/**
 * Authorization middleware to check if user is admin.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @throws {UnauthorizedError} if user is not an admin.
 */
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(new UnauthorizedError('Admin privileges required'));
  }
  next();
};

module.exports = { authenticate, requireAdmin };