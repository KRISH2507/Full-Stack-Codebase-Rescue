const Shipment = require('../models/Shipment');
const { NotFoundError, UnauthorizedError } = require('../utils/errors.util');

/**
 * Retrieves all shipments for a specific user.
 * @param {string} userId - The user ID.
 * @returns {Promise<Array>} The list of shipments with populated user details.
 */
const getUserShipments = async (userId) => {
  // Using .populate() to solve N+1 queries.
  return await Shipment.find({ userId }).populate('userId', 'name email role');
};

/**
 * Retrieves a single shipment by its ID.
 * @param {string} shipmentId - The shipment ID.
 * @param {string} userId - The requesting user ID.
 * @param {string} role - The requesting user role.
 * @returns {Promise<Object>} The shipment data.
 * @throws {NotFoundError} if shipment doesn't exist.
 * @throws {UnauthorizedError} if user lacks access rights.
 */
const getShipmentById = async (shipmentId, userId, role) => {
  const shipment = await Shipment.findById(shipmentId).populate('userId', 'name email');
  if (!shipment) {
    throw new NotFoundError('Shipment not found');
  }

  if (shipment.userId._id.toString() !== userId && role !== 'admin') {
    throw new UnauthorizedError('No access to this shipment');
  }

  return shipment;
};

/**
 * Creates a new shipment.
 * @param {Object} shipmentData - The shipment payload.
 * @param {string} userId - The ID of the user creating the shipment.
 * @returns {Promise<Object>} The created shipment.
 */
const createShipment = async (shipmentData, userId) => {
  const trackId = `SHIP-${Date.now()}-${Math.floor(Math.random() * 100)}`;
  
  const newShipment = new Shipment({
    ...shipmentData,
    trackingId: trackId,
    userId,
    status: 'pending'
  });

  return await newShipment.save();
};

/**
 * Updates a shipment's status.
 * @param {string} shipmentId - The shipment ID.
 * @param {string} status - The new status.
 * @param {string} role - Requesting user's role.
 * @returns {Promise<Object>} The updated shipment.
 * @throws {NotFoundError} if shipment doesn't exist.
 * @throws {UnauthorizedError} if user lacks admin privileges to set 'delivered'.
 */
const updateShipmentStatus = async (shipmentId, status, role) => {
  if (status === 'delivered' && role !== 'admin') {
    throw new UnauthorizedError('Admins only can deliver');
  }

  const updatedShipment = await Shipment.findByIdAndUpdate(
    shipmentId,
    { status },
    { new: true, runValidators: true }
  );

  if (!updatedShipment) {
    throw new NotFoundError('Shipment not found');
  }

  return updatedShipment;
};

/**
 * Deletes a shipment.
 * @param {string} shipmentId - The shipment ID.
 * @param {string} userId - The requesting user ID.
 * @param {string} role - The requesting user role.
 * @returns {Promise<void>} Resolves when deleted.
 * @throws {NotFoundError} if shipment doesn't exist.
 * @throws {UnauthorizedError} if user lacks access to delete it.
 */
const deleteShipment = async (shipmentId, userId, role) => {
  const shipment = await Shipment.findById(shipmentId);
  
  if (!shipment) {
    throw new NotFoundError('Shipment not found');
  }
  
  if (shipment.userId.toString() !== userId && role !== 'admin') {
    throw new UnauthorizedError('No access to delete this shipment');
  }

  await Shipment.findByIdAndDelete(shipmentId);
};

module.exports = {
  getUserShipments,
  getShipmentById,
  createShipment,
  updateShipmentStatus,
  deleteShipment
};