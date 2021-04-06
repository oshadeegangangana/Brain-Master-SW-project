const express = require('express');
const paperController = require('../controllers/paper.controller');

const router = express.Router();

router.post("/", paperController.save);
router.get("/:id", paperController.show);
router.get("/", paperController.index);
router.post("/:id", paperController.update);
router.delete("/:id", paperController.destroy);

module.exports = router;