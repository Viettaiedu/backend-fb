const express = require('express');
const { getLikes,addLike ,deleteLike} =require('../controllers/like');
const { verify } = require('../middleware/verify');
const router = express.Router();

router.get('',verify,getLikes);
router.post('',verify,addLike);
router.delete('/:postId',verify,deleteLike);

module.exports = router;