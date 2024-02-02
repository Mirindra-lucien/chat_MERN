const router = require('express').Router();
const controller = require('../controllers/authController');
const bodyParser = require('express-fileupload');

router.use("/api/signin", bodyParser());
router.route("/api/signin").post(controller.signin);
router.route("/api/signout/:dec").get(controller.signout);

module.exports = router;