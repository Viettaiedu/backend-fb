const express = require('express');
const { verify } = require('../middleware/verify');
const {addPost ,getPosts,deletePost} = require('../controllers/post');
const router = express.Router();

router.post('', verify, addPost );
router.get('', verify,getPosts );
router.delete('/:postId', verify,deletePost );

module.exports = router;