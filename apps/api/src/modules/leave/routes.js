const express = require('express');
const router = express.Router();
const c = require('./controller');
const authenticate = require('../../middleware/authenticate');
const { authorize } = require('../../middleware/authorize');
const validate = require('../../middleware/validate');
const { applyLeaveValidation, approveRejectValidation, listValidation } = require('./validation');

router.use(authenticate);
router.get('/balance', c.balance);
router.get('/pending', authorize('admin', 'hr'), c.pendingApprovals);
router.get('/', listValidation, validate, c.list);
router.post('/', applyLeaveValidation, validate, c.apply);
router.put('/:id/action', authorize('admin', 'hr'), approveRejectValidation, validate, c.approveReject);
router.patch('/:id/cancel', c.cancel);

module.exports = router;
