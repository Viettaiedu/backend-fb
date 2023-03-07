const express = require('express');
const {getStories,postStory,deleteStory} = require('../controllers/story');
const { verify } = require('../middleware/verify');
const router = express.Router();


router.get('', verify,getStories );
router.post('', verify,postStory );
router.delete('', verify,deleteStory );
module.exports = router;