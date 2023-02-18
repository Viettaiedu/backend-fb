const express = require('express');
const {upload} = require('../helpers/upload');
const {uploadController} = require('../controllers/upload');
const { verify } = require('../middleware/verify');
const router = express.Router();
router.post('',verify,upload.single('file'), uploadController)
module.exports = router;