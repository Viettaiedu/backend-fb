const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,'../client/public/uploads');
    },
    filename: function(req,file,cb) {
        const uniqueSuffix = Date.now()+"_"+Math.round(Math.random() * 100000);
        cb(null,uniqueSuffix+file.originalname);
    }
})

 const upload = multer({
    storage:storage
})

module.exports = {
    upload:upload
}