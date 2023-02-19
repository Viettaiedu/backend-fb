const moment = require("moment");
const db = require("../db");

const addPost = (req, res) => {
  const q = "INSERT INTO posts(`desc`,`image`,`userId`,`createdAt`) VALUES(?)";
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const values = [req.body.desc, req.body.image, req.userInfo.id, date];
  db.query(q, [values], (err, data) => {
    if (err)
      return res
        .status(404)
        .json({ message: "Error systax when query sql", error: err });
        if(data.affectedRows <= 0) return res.status(404).json({message:"Update post failed"})
  });
  const q2 =
  "SELECT DISTINCT p.* , profilePic , firstName,lastName FROM posts AS p JOIN users AS u ON (p.userId = u.id) LEFt JOIN friends AS f ON (p.userId = f.userId_1 OR p.userId = f.userId_2) ORDER BY createdAt DESC LIMIT 1";
  db.query(q2, (err, data) => {
    if (err)
      return res
        .status(404)
        .json({ message: "Error systax when query sql", error: err });
    res.status(201).json(data[0]);
  });
};
const deletePost = (req, res) => {
  const q = "DELETE FROM posts WHERE userId = ? AND id = ?";
  db.query(q, [req.userInfo.id , req.params.postId], (err, data) => {
    if (err)
      return res
        .status(404)
        .json({ message: "Error systax when query sql", error: err });
        if(data.affectedRows <= 0 ) return  res.status(201).json({message:"Delete failed"});
    res.status(201).json({message:"Delete has been successfully"});
  });
};
const getPosts = (req, res) => {
  const q =
    "SELECT DISTINCT p.* , profilePic , firstName,lastName FROM posts AS p JOIN users AS u ON (p.userId = u.id) LEFt JOIN friends AS f ON (p.userId = f.userId_1 OR p.userId = f.userId_2) WHERE p.userId = ? OR ? = f.userId_1 OR ? = f.userId_2 ORDER BY createdAt DESC;";
  db.query(q, [req.userInfo.id, req.userInfo.id, req.userInfo.id], (err, data) => {
    if (err)
      return res
        .status(404)
        .json({ message: "Error systax when query sql", error: err });
    res.status(201).json(data);
  });
};
module.exports = {
  addPost,
  getPosts,
  deletePost
};
