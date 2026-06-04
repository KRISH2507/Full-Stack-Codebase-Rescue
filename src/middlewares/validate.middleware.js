const { ValidationError } = require('../utils/errors.util');

/**
 * Middleware factory to validate request body against a Joi schema.
 * @param {Object} schema - The Joi schema to validate against.
 * @returns {Function} Express middleware function.
 */
const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message).join(', ');
      return next(new ValidationError(errorMessages));
    }

    req.body = value;
    next();
  };
};

module.exports = { validateBody };