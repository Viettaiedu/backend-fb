const moment = require("moment");
const db = require("../db");

const getStories = (req, res) => {
    const q =
      "SELECT DISTINCT s.* ,s.desc, profilePic , firstName,lastName FROM stories AS s JOIN users AS u ON (s.userId = u.id) LEFt JOIN friends AS f ON (s.userId = f.userId_1 OR s.userId = f.userId_2)  ORDER BY createdAt DESC;";
    db.query(q, (err, data) => {
      if (err)
        return res
          .status(404)
          .json({ message: "Error systax when query sql", error: err });
      res.status(201).json(data);
    });
  };
  const postStory = (req,res) => {
      const q = "INSERT INTO stories(`video`,`userId` ,`createdAt`,`desc`) VALUES(?)";
      const date = moment().format("YYYY-MM-DD HH:mm:ss");
      db.query(q,[[req.body.video, req.userInfo.id ,date,req.body.desc]] , (err,data) => {
        if(err) return res.status(404).json({message:"Error when executing query mysql" , error:err});
      });
      const q2 =
      "SELECT DISTINCT s.* ,s.desc, profilePic , firstName,lastName FROM stories AS s JOIN users AS u ON (s.userId = u.id) LEFt JOIN friends AS f ON (s.userId = f.userId_1 OR s.userId = f.userId_2)  ORDER BY createdAt DESC LIMIT 1;";
      db.query(q2, (err, data) => {
      if (err)
        return res
          .status(404)
          .json({ message: "Error systax when query sql", error: err });
      res.status(201).json(data[0]);
    });

  }

  const deleteStory = (req,res) => {
    const q = "DELETE FROM stories WHERE id = ?";
    db.query(q,[req.query.id] , (err,data) => {
      
      if(err)return res
      .status(404)
      .json({ message: "Error systax when query sql", error: err });
      
      if(data.affectedRows <= 0) return res.status(404).json({message:"Id not found"})
      res.status(200).json({message:"Delete successfully"});
    })
  }


module.exports = {
    getStories,
    postStory,
    deleteStory
}