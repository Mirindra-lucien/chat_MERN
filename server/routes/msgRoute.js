const express = require('express');
const bodyParser = require('express-fileupload');
const controller = require('../controllers/msgController');
const router = express.Router();

router.use("/api/message", bodyParser());
router.route("/api/message/:identit").get(controller.allMessage);
router.route("/api/message").post(controller.message);

module.exports = router;