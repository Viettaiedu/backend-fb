const express = require('express');
const { verify } = require('../middleware/verify');
const {addComment} = require('../controllers/comment');
const router = express.Router();

router.post('', verify, addComment );

module.exports = router;