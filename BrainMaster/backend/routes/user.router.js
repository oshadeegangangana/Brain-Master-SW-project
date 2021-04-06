const express = require('express');
const userContoller = require('../controllers/user.controller');

const router = express.Router();

router.post("/", userContoller.save);
router.get("/:id", userContoller.show);
router.get("/", userContoller.index);
router.post("/:id", userContoller.update);
router.delete("/:id", userContoller.destroy);
router.get("/rank/leaderboard", userContoller.ranking);

module.exports = router;