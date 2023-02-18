const express = require('express');
const { verify } = require('../middleware/verify');
const {addPost ,getPosts} = require('../controllers/post');
const router = express.Router();

router.post('', verify, addPost );
router.get('', verify,getPosts );

module.exports = router;