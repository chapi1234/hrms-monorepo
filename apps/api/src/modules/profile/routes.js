const express = require('express');
const router = express.Router();
const c = require('./controller');
const authenticate = require('../../middleware/authenticate');
const { authorize } = require('../../middleware/authorize');
const validate = require('../../middleware/validate');
const upload = require('../../middleware/upload');
const { updateProfileValidation } = require('./validation');

router.use(authenticate);
router.get('/me', c.getMyProfile);
router.get('/:id', authorize('admin', 'hr'), c.getById);
router.put('/me', updateProfileValidation, validate, c.update);
router.post('/me/avatar', upload.single('avatar'), c.uploadAvatar);

module.exports = router;
