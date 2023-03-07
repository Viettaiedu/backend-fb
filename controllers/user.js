
const db = require('../db');
const getUser = (req,res) => {
    const q = "SELECT * FROM users WHERE id = ?";
    db.query(q , [req.params.userId] , (err,result) => {
        if(err) return res.status(404).json({message:"Error systax query sql", error:err});
        if(result.length <= 0) return res.status(404).json({message:"id user not found"});
        res.status(200).json({message:"Get user sucessfully", user:result})
    })
}

const getUserFriends= (req,res) => {
        const q =`SELECT u.id , u.email,u.firstName,u.lastName,u.profilePic , u.coverPic , u.createdAt FROM users AS u JOIN friends AS f ON (u.id=f.userId_1 OR u.id = userId_2) WHERE (f.userId_1 = ? OR f.userId_2 = ?) AND u.id <> ?`;
        db.query(q, [req.userInfo.id,req.userInfo.id,req.userInfo.id] , (err,data) => {
            if(err) return res.status(404).json({message:"Error systax query sql", error:err});
            res.status(200).json(data);
        })
}

const getUserOthers = (req,res )=> {
    const q = `SELECT  u.id , u.email,u.firstName,u.lastName,u.profilePic , u.coverPic , u.createdAt FROM users AS u WHERE u.id NOT IN ( SELECT u.id FROM users AS u JOIN friends AS f ON (u.id=f.userId_1 OR u.id = userId_2) WHERE (userId_1 = ? OR userID_2 = ?))`;
    db.query(q, [req.userInfo.id,req.userInfo.id],(err,data) => {
        if(err) return res.status(404).json({message:"Error systax query sql", error:err});
        res.status(200).json(data);
    })
}



module.exports = {
    getUser,
    getUserFriends,
    getUserOthers,

}