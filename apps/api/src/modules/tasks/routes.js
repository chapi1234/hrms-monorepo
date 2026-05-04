const express = require('express');
const router = express.Router();
const c = require('./controller');
const authenticate = require('../../middleware/authenticate');
const { authorize } = require('../../middleware/authorize');
const validate = require('../../middleware/validate');
const { createTaskValidation, updateTaskValidation, addCommentValidation } = require('./validation');

router.use(authenticate);
router.get('/', c.list);
router.get('/:id', c.getById);
router.post('/', createTaskValidation, validate, c.create);
router.put('/:id', updateTaskValidation, validate, c.update);
router.post('/:id/comments', addCommentValidation, validate, c.addComment);
router.delete('/:id', authorize('admin', 'hr'), c.remove);

module.exports = router;
