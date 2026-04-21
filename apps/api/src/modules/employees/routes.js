const express = require('express');
const router = express.Router();
const controller = require('./controller');
const authenticate = require('../../middleware/authenticate');
const { authorize } = require('../../middleware/authorize');
const validate = require('../../middleware/validate');
const auditLog = require('../../middleware/auditLog');
const { createEmployeeValidation, updateEmployeeValidation, listValidation } = require('./validation');

router.use(authenticate);

router.get('/stats', authorize('admin', 'hr'), controller.stats);
router.get('/', authorize('admin', 'hr'), listValidation, validate, controller.list);
router.get('/:id', controller.getById);
router.post('/', authorize('admin', 'hr'), createEmployeeValidation, validate, auditLog('Employee', 'created'), controller.create);
router.put('/:id', authorize('admin', 'hr'), updateEmployeeValidation, validate, auditLog('Employee', 'updated'), controller.update);
router.patch('/:id/terminate', authorize('admin', 'hr'), auditLog('Employee', 'terminated'), controller.terminate);
router.delete('/:id', authorize('admin'), auditLog('Employee', 'deleted'), controller.remove);

module.exports = router;
