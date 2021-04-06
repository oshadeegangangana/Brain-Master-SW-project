const express = require('express');
const examController = require('../controllers/exam.controller');

const router = express.Router();

router.post("/", examController.save);
router.get("/:id", examController.show);
router.get("/", examController.index);
router.get("/:paper_id/:user_id",examController.getExam);
router.post("/:paper_id/:user_id",examController.examCount)
router.post("/:id", examController.update);
router.delete("/:id", examController.destroy);

module.exports = router;