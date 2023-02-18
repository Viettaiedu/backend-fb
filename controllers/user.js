
const db = require('../db');
const getUser = (req,res) => {
    const q = "SELECT * FROM users WHERE id = ?";
    db.query(q , [req.params.userId] , (err,result) => {
        if(err) return res.status(404).json({message:"Error systax query sql", error:err});
        if(result.length <= 0) return res.status(404).json({message:"id user not found"});
        res.status(200).json({message:"Get user sucessfully", user:result})
    })
}
module.exports = {
    getUser
}