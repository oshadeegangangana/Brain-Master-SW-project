const express = require('express');
const loginContoller = require('../controllers/login.controller');

const router = express.Router();

router.post("/", loginContoller.index);
router.post("/forgot_pw", loginContoller.resetPw);

module.exports = router;