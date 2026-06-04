const express = require('express');
const router = express.Router();

const {
  getShipments,
  getShipmentById,
  createShipment,
  updateShipmentStatus,
  deleteShipment
} = require('../controllers/shipment.controller');

const { authenticate } = require('../middlewares/auth.middleware');
const { validateBody } = require('../middlewares/validate.middleware');
const { shipmentCreationSchema, shipmentUpdateSchema } = require('../validators/schemas');

// Apply authentication to all shipment routes
router.use(authenticate);

router.get('/', getShipments);
router.get('/:id', getShipmentById);
router.post('/', validateBody(shipmentCreationSchema), createShipment);
router.patch('/:id/status', validateBody(shipmentUpdateSchema), updateShipmentStatus);
router.delete('/:id', deleteShipment);

module.exports = router;