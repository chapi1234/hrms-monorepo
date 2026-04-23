const express = require('express');
const router = express.Router();
const c = require('./controller');
const authenticate = require('../../middleware/authenticate');
const { authorize } = require('../../middleware/authorize');
const validate = require('../../middleware/validate');
const { checkInValidation, checkOutValidation, manualEntryValidation, listValidation } = require('./validation');

router.use(authenticate);
router.get('/today', authorize('admin', 'hr'), c.todaySummary);
router.get('/', listValidation, validate, c.list);
router.post('/check-in', checkInValidation, validate, c.checkIn);
router.post('/check-out', checkOutValidation, validate, c.checkOut);
router.post('/manual', authorize('admin', 'hr'), manualEntryValidation, validate, c.manualEntry);

module.exports = router;
