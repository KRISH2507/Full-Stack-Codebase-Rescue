const express = require('express');
const router = express.Router();

const { register, login, getProfile } = require('../controllers/user.controller');
const { validateBody } = require('../middlewares/validate.middleware');
const { userRegistrationSchema, userLoginSchema } = require('../validators/schemas');
const { authenticate } = require('../middlewares/auth.middleware');

router.post('/register', validateBody(userRegistrationSchema), register);
router.post('/login', validateBody(userLoginSchema), login);
router.get('/profile', authenticate, getProfile);

module.exports = router;