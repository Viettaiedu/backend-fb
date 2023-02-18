

 const uploadController = (req,res) => {
    res.status(200).json({file: req.file.filename})
}

module.exports = {
    uploadController
}