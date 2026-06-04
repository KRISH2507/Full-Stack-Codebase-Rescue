const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/password.util');
const { UnauthorizedError, NotFoundError, ConflictError } = require('../utils/errors.util');

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

/**
 * Registers a new user.
 * @param {Object} userData - The user details.
 * @returns {Promise<Object>} The registered user.
 * @throws {ConflictError} if user email already exists.
 */
const registerUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new ConflictError('Email already in use');
  }

  const hashedPassword = await hashPassword(userData.password);
  
  const newUser = new User({
    ...userData,
    password: hashedPassword
  });

  const savedUser = await newUser.save();
  const userResponse = savedUser.toObject();
  delete userResponse.password;

  return userResponse;
};

/**
 * Authenticates a user and generates a JWT token.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} An object containing the token and user data.
 * @throws {UnauthorizedError} if authentication fails.
 */
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: '12h' }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};

/**
 * Retrieves a user profile by ID.
 * @param {string} userId - The user ID.
 * @returns {Promise<Object>} The user profile.
 * @throws {NotFoundError} if user profile is not found.
 */
const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new NotFoundError('User not found');
  }
  return user;
};

module.exports = { registerUser, loginUser, getUserProfile };