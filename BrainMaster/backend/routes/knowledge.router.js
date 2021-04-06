const express = require('express');
const knowledgeController = require('../controllers/knowledge.controller');

const router = express.Router();

router.post("/", knowledgeController.save);
router.get("/:id", knowledgeController.show);
router.get("/", knowledgeController.index);
router.patch("/:id", knowledgeController.update);
router.delete("/:id", knowledgeController.destroy);

module.exports = router;