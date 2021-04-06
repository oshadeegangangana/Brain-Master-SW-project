const express = require('express');
const gkQuestionController = require('../controllers/gkquestion.controller');

const router = express.Router();

router.post("/", gkQuestionController.save);
router.get("/:id", gkQuestionController.show);
router.get("/", gkQuestionController.index);
router.post("/:id", gkQuestionController.update);
router.delete("/:id", gkQuestionController.destroy);

module.exports = router;