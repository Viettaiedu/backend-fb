const moment = require("moment");
const db = require("../db");

const addPost = (req, res) => {
  const q = "INSERT INTO posts(`desc`,`image`,`userId`,`createdAt`) VALUES(?)";
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const values = [req.body.desc, req.body.image, req.userInfo.id, date];
  const valuesUpdate= {
   desc: req.body.desc,image: req.body.image, userId: req.userInfo.id, createdAt:date
  }
  db.query(q, [values], (err, data) => {
    if (err)
      return res
        .status(404)
        .json({ message: "Error systax when query sql", error: err });
    res.status(201).json(valuesUpdate);
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
};
