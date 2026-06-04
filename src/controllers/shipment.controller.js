const shipmentService = require('../services/shipment.service');

/**
 * Retrieves shipments for the logged-in user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware.
 */
const getShipments = async (req, res, next) => {
  try {
    const shipments = await shipmentService.getUserShipments(req.user.id);
    res.json({
      status: 'success',
      results: shipments.length,
      data: shipments
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a specific shipment by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware.
 */
const getShipmentById = async (req, res, next) => {
  try {
    const shipment = await shipmentService.getShipmentById(req.params.id, req.user.id, req.user.role);
    res.json({
      status: 'success',
      data: shipment
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Creates a new shipment.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware.
 */
const createShipment = async (req, res, next) => {
  try {
    const newShipment = await shipmentService.createShipment(req.body, req.user.id);
    res.status(201).json({
      status: 'success',
      data: newShipment
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Updates a shipment's status.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware.
 */
const updateShipmentStatus = async (req, res, next) => {
  try {
    const updatedShipment = await shipmentService.updateShipmentStatus(
      req.params.id,
      req.body.status,
      req.user.role
    );
    res.json({
      status: 'success',
      data: updatedShipment
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes a shipment.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware.
 */
const deleteShipment = async (req, res, next) => {
  try {
    await shipmentService.deleteShipment(req.params.id, req.user.id, req.user.role);
    res.json({
      status: 'success',
      message: `Deleted shipment ${req.params.id}`
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getShipments,
  getShipmentById,
  createShipment,
  updateShipmentStatus,
  deleteShipment
};