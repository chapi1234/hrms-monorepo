const express = require('express');
const router = express.Router();

router.use('/auth',          require('./modules/auth/routes'));
router.use('/employees',     require('./modules/employees/routes'));
router.use('/departments',   require('./modules/departments/routes'));
router.use('/attendance',    require('./modules/attendance/routes'));
router.use('/leave',         require('./modules/leave/routes'));
router.use('/payroll',       require('./modules/payroll/routes'));
router.use('/profile',       require('./modules/profile/routes'));
router.use('/recruitment',   require('./modules/recruitment/routes'));
router.use('/performance',   require('./modules/performance/routes'));
router.use('/tasks',         require('./modules/tasks/routes'));
router.use('/documents',     require('./modules/documents/routes'));
router.use('/reports',       require('./modules/reports/routes'));
router.use('/shifts',        require('./modules/shifts/routes'));
router.use('/settings',      require('./modules/settings/routes'));
router.use('/notifications', require('./modules/notifications/routes'));

module.exports = router;
