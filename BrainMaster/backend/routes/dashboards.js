const express = require('express');
const dashboardController = require('../controllers/dashboard.controller');

const router = express.Router();


router.get("/counts", dashboardController.showDashboardCounts);
router.get("/charts", dashboardController.showDashboardCharts);
router.get("/fullDetails", dashboardController.showDashboardFullDetails);
router.get("/complains", dashboardController.showDashboardComplains);
router.get("/violated", dashboardController.showDashboardViolated);
router.get("/:id", dashboardController.showInspetedBusById);

module.exports = router;