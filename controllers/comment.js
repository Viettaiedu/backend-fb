
const moment = require('moment');
const db = require('../db');

 const addComment = (req,res )=> {
    const q = "INSERT INTO comments(`desc`,`userId`,`postId`,`createdAt`) VALUES(?);";
    const date = moment().locale('vi').format('YYYY-MM-DD HH:mm:ss');
    db.query(q,[[req.body.desc,req.userInfo.id,req.body.postId,date]] ,(err,data) => {
        if(err) return res.status(404).json({message:"Error when update commments" ,error:err});
        if(data.affectedRows <= 0) return res.status(404).json({message:"Add comment failed"})
    })
    const q2="SELECT DISTINCT c.* , u.id AS userID ,profilePic , firstName ,lastName FROM comments AS c JOIN users AS u ON (c.userId = u.id) JOIN posts AS p ON (c.postId = p.id) ORDER BY createdAt DESC LIMIT 1";
        db.query(q2 ,(err,data) => {
            if(err) return res.status(404).json({message:"Error when getting commments" ,error:err});
            res.status(201).json(data[0]);
        })
}
 const getComments = (req,res )=> {
    const q = "SELECT DISTINCT c.* , u.id AS userID ,profilePic , firstName ,lastName FROM comments AS c JOIN users AS u ON (c.userId = u.id) JOIN posts AS p ON (c.postId = p.id) ORDER BY createdAT DESC;"
    db.query(q , (err,data) => {
        if(err) return res.status(404).json({message:"Error when getting commments" ,error:err});
        res.status(200).json(data);
    })
}
 const deleteComment = (req,res )=> {
    const q = "DELETE FROM comments WHERE id = ?;";
    db.query(q , [req.params.id],(err,data) => {
        if(err) return res.status(404).json({message:"Error when delete commment" ,error:err});
        if(data.affectedRows <= 0) return  res.status(200).json({message:"Delete failed"});
        res.status(200).json({message:"Delete successfully"});
    })
}
 const updateComment = (req,res )=> {
    const q = "UPDATE comments AS c  SET c.desc = ? WHERE id = ?"
    db.query(q , [req.body.desc , req.body.id],(err,data) => {
        if(err) return res.status(404).json({message:"Error when Update commment" ,error:err});
        if(data.affectedRows <= 0) return  res.status(200).json({message:"Update failed"});
        res.status(200).json({message:"Update successfully"});
    })
}
module.exports = {
    addComment,
    getComments,
    deleteComment,
    updateComment
}