const express = require('express');
const iqQuestionController = require('../controllers/iqquestion.controller');

const router = express.Router();

router.post("/", iqQuestionController.save);
router.get("/:id", iqQuestionController.show);
router.get("/", iqQuestionController.index);
router.post("/:id", iqQuestionController.update);
router.delete("/:id", iqQuestionController.destroy);

module.exports = router;