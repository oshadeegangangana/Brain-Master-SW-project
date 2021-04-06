const express = require('express');
const adController = require('../controllers/advertisment.controller');

const router = express.Router();

router.post("/", adController.save);
router.get("/:id", adController.show);
router.get("/", adController.index);
router.get("/pending/get_all", adController.indexPending);
router.get("/approved/dash/ads_panel/get_all", adController.indexApproved);
router.post("/permission/update/:id", adController.update);
router.delete("/:id", adController.destroy);

module.exports = router;