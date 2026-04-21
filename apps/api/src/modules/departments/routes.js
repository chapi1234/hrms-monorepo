const express = require('express');
const router = express.Router();
const c = require('./controller');
const authenticate = require('../../middleware/authenticate');
const { authorize } = require('../../middleware/authorize');
const validate = require('../../middleware/validate');
const auditLog = require('../../middleware/auditLog');
const { createDeptValidation, updateDeptValidation } = require('./validation');

router.use(authenticate);
router.get('/headcount', authorize('admin', 'hr'), c.headcount);
router.get('/', c.list);
router.get('/:id', c.getById);
router.post('/', authorize('admin', 'hr'), createDeptValidation, validate, auditLog('Department', 'created'), c.create);
router.put('/:id', authorize('admin', 'hr'), updateDeptValidation, validate, auditLog('Department', 'updated'), c.update);
router.delete('/:id', authorize('admin'), auditLog('Department', 'deleted'), c.remove);

module.exports = router;
