const Joi = require('joi');

const userRegistrationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('user', 'admin').optional()
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const shipmentCreationSchema = Joi.object({
  origin: Joi.string().required(),
  destination: Joi.string().required(),
  weight: Joi.number().positive().required(),
  carrier: Joi.string().required()
});

const shipmentUpdateSchema = Joi.object({
  status: Joi.string().valid('pending', 'in-progress', 'delivered', 'cancelled').required()
});

module.exports = {
  userRegistrationSchema,
  userLoginSchema,
  shipmentCreationSchema,
  shipmentUpdateSchema
};