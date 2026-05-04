const express = require('express');
const router = express.Router();
const c = require('./controller');
const authenticate = require('../../middleware/authenticate');
const { authorize } = require('../../middleware/authorize');
const validate = require('../../middleware/validate');
const { createShiftValidation } = require('./validation');

router.use(authenticate);
router.get('/', c.list);
router.post('/', authorize('admin', 'hr'), createShiftValidation, validate, c.create);
router.put('/:id', authorize('admin', 'hr'), c.update);
router.post('/:id/assign', authorize('admin', 'hr'), c.assign);

module.exports = router;
