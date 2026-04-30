const express = require('express');
const router = express.Router();
const c = require('./controller');
const authenticate = require('../../middleware/authenticate');
const { authorize } = require('../../middleware/authorize');
const validate = require('../../middleware/validate');
const { generatePayrollValidation, bulkGenerateValidation, listValidation } = require('./validation');

router.use(authenticate);
router.get('/', listValidation, validate, c.list);
router.get('/:id/payslip', c.payslip);
router.post('/generate', authorize('admin', 'hr'), generatePayrollValidation, validate, c.generate);
router.post('/bulk-generate', authorize('admin', 'hr'), bulkGenerateValidation, validate, c.bulkGenerate);
router.patch('/:id/approve', authorize('admin', 'hr'), c.approve);
router.patch('/:id/paid', authorize('admin', 'hr'), c.paid);

module.exports = router;
