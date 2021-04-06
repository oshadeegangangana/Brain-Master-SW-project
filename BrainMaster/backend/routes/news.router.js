const express = require('express');
const newsController = require('../controllers/news.controller');

const router = express.Router();

router.post("/", newsController.save);
router.get("/:id", newsController.show);
router.get("/", newsController.index);
router.get("/get_all/dashboard", newsController.indexDash);
router.post("/:id", newsController.update);
router.delete("/:id", newsController.destroy);

module.exports = router;