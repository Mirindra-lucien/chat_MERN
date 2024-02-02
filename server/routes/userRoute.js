const router = require('express').Router();
const expressFileupload = require('express-fileupload');
const controller = require('../controllers/userController');

router.use('/api/account', expressFileupload());
router.param('id', controller.getUser);
router.post('/api/account', controller.create);
router.route('/api/account/:id')
        .get(controller.view)
        .delete(controller.del)
        .put(controller.update);
router.route('/api/confirm/:id').get(controller.confirm);
module.exports = router;