const express = require('express');
const iqQuestionController = require('../controllers/iq-question2.controller');

const router = express.Router();

// router.post("/", iqQuestionController.findCount );
// router.post("/:id", iqQuestionController.findCountIQ);
router.post("/:id", iqQuestionController.show );
router.post("/", iqQuestionController.showAll );


module.exports = router;