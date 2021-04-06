const express = require('express');
const questionController = require('../controllers/question.controller');

const router = express.Router();

router.post("/", questionController.save);
router.get("/:id", questionController.show);
router.get("/", questionController.index);
router.get("/get_pending/questions", questionController.indexPending);
router.get("/get_permission/accept_decline/questions", questionController.indexPermission);
router.post("/:id", questionController.update);
router.delete("/:id", questionController.destroy);

module.exports = router;