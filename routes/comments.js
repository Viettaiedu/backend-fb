const express = require('express');
const { verify } = require('../middleware/verify');
const {addComment,getComments,deleteComment,updateComment} = require('../controllers/comment');
const router = express.Router();

router.post('', verify, addComment );
router.get('', verify, getComments );
router.delete('/:id', verify, deleteComment );
router.put('', verify, updateComment );

module.exports = router;