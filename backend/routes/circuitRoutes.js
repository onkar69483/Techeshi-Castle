const express = require('express');
const router = express.Router();
const { getCircuitSteps } = require('../controllers/circuitsController');

router.get('/', getCircuitSteps );

module.exports = router;

