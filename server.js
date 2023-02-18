require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:3000'
}));
const routesAuth = require('./routes/auth');
const routesUsers = require('./routes/users');
const routesComments = require('./routes/comments');
const routesPosts = require('./routes/posts');
const routesLikes = require('./routes/likes');
const routesStories = require('./routes/stories');
const routesUpload = require('./routes/upload');
const routesFriends= require('./routes/friends');
const routesFriendsRequest= require('./routes/friendsRequest');



app.use('/api/auth' ,routesAuth);
app.use('/api/users' , routesUsers);
app.use('/api/comments' , routesComments);
app.use('/api/posts' , routesPosts);
app.use('/api/likes' , routesLikes);
app.use('/api/stories' , routesStories);
app.use('/api/friends' , routesFriends);
app.use('/api/upload' , routesUpload);
app.use('/api/friends-request' , routesFriendsRequest);
const PORT =  5500;

app.listen(PORT , ()=> console.log("listening on port " + PORT));

