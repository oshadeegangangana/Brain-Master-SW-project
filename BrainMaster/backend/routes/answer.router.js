const express = require('express');
const answerController = require('../controllers/answer.controller');

const router = express.Router();

router.post("/", answerController.save);
router.get("/:id", answerController.show);
router.get("/", answerController.index);
router.patch("/:id", answerController.update);
router.delete("/:id", answerController.destroy);

module.exports = router;