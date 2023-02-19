const express = require('express');
const { verify } = require('../middleware/verify');
const {addComment,getComments} = require('../controllers/comment');
const router = express.Router();

router.post('', verify, addComment );
router.get('', verify, getComments );

module.exports = router;