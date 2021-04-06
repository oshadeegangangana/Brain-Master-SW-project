const express = require('express');
const passengerdashboardController = require('../controllers/passengerdashboard.controller');

const router = express.Router();


router.get("/balance/:id", passengerdashboardController.showPassengerById);
router.get("/journeys/:id", passengerdashboardController.showPassengerJourney);
router.get("/ruleviolated/:id", passengerdashboardController.showPassengerViolatedRules);


module.exports = router;