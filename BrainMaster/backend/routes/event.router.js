const express = require('express');
const eventController = require('../controllers/event.controller');

const router = express.Router();

router.post("/", eventController.save);
router.get("/:id", eventController.show);
router.get("/", eventController.index);
router.get("/get_all/dashboard", eventController.indexDash);
router.post("/:id", eventController.update);
router.delete("/:id", eventController.destroy);

module.exports = router;