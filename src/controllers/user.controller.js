const userService = require('../services/user.service');

/**
 * Handles user registration.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware.
 */
const register = async (req, res, next) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({
      success: true,
      message: 'Account created!',
      user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles user login.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware.
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await userService.loginUser(email, password);
    res.json({
      success: true,
      msg: 'Login OK',
      ...data
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves the current user's profile.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware.
 */
const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserProfile(req.user.id);
    res.json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getProfile };