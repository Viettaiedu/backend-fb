require('dotenv').config();
const jwt = require('jsonwebtoken');
const db= require('../db');
const bcryptjs = require('bcryptjs');
const moment = require('moment');
const register = (req,res) => {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(req.body.password ,salt );
    let q = "SELECT * FROM users WHERE email = ?";
    db.query(q , [req.body.email] , (err,result) => {
        if(err) return res.status(404).json({message:"Error systax sql when query" , error:err});
        if(result.length > 0)  return res.status(404).json({message:"Email is existing"});
        q = "INSERT INTO users(`email`,`password`,`firstName`,`lastName`,`createdAt`) VALUES(?)";
        const day = moment().locale('vi').format('YYYY-MM-DD hh:mm:ss');
       const values = [req.body.email,hash,req.body.firstName,req.body.lastName ,day];
       db.query(q ,[values], (err,result) => {
           if(err) return res.status(404).json({message:"Error systax sql when query" , error:err});
           res.status(200).json({message:"INSERT USERS SUCCESSFULLY", user:result});
       })
    })
}

const login = (req,res) => {
    const  q = 'SELECT * FROM users WHERE email = ?';
    db.query(q, [req.body.email] , (err,result) => {
        if(err) return res.status(404).json({message:"Error systax sql when query" , error:err});
        if(result.length <= 0) return res.status(404).json({message:"Email is not invalid"});
        const q = 'SELECT * FROM users WHERE password = ?';
        const isPassword = bcryptjs.compareSync(req.body.password , result[0].password);
        if(!isPassword) return res.status(404).json({message:"Password is not valid"});
        const token =  jwt.sign({id:result[0].id , email:result[0].email} , process.env.secret_key);
        const {password , ...info} = result[0];
        res.cookie('accessToken', token ,{
            httpOnly:true
        }).status(200).json({
            info:info
        })
    })
}
const logout = (req,res) => {
    res.clearCookie('accessToken' , {
        secure:true,
        sameSite:"none"
    }).status(200).json({
        message:"Log out successfully"
    })
}


module.exports = {
    register,
    login,logout
}