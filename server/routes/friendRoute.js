const router = require('express').Router();
const controller = require('../controllers/friendController');
const bodyParser = require('express-fileupload');
// router.param(":identity", controller.getFriend);

router.use("/api/friend", bodyParser());
router.route('/api/friend/add').put(controller.sendRequest);
router.route('/api/friend/confirm').put(controller.confirmReq);
router.route('/api/friend/delete').delete(controller.deleteReq);
router.route('/api/friend/remove').delete(controller.remove);
router.route('/api/friend/all/:idt').get(controller.allFriends);
router.route('/api/friend/reqs/:idt').get(controller.allRequests);

module.exports = router;