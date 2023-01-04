const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const isAuth = require('../middleware/is-auth');
const postController = require('../controllers/post');

const postValidation = [
  body('title').isLength({ min: 5 }),
  body('body').isLength({ min: 5 }),
];

router.get('/', isAuth, postController.getPosts);
router.post('/', isAuth, postValidation, postController.createPost);
router.get('/:id', isAuth, postController.getPost);
router.patch('/:id', isAuth, postValidation, postController.updatePost);
router.delete('/:id', isAuth, postController.deletePost);

module.exports = router;
