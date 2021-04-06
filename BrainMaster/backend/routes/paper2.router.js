const express = require('express');
const paperController = require('../controllers/paper2.controller');

const router = express.Router();

router.post("/", paperController.findCount );
router.post("/:id", paperController.findCountIQ);
router.get("/:id", paperController.show );
router.get("/get_exams/:user_id",paperController.getExams);


module.exports = router;