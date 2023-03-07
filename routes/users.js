const express = require('express');
const {getUser,getUserFriends,getUserOthers} = require('../controllers/user');
const {verify} = require('../middleware/verify');
const router = express.Router();

router.get('/find/:userId' , getUser);
router.get('/friends' , verify,getUserFriends);
router.get('/others' , verify,getUserOthers);

module.exports = router;