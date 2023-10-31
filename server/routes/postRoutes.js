const express = require('express'); 
const postRouter = express.Router();

const {
    getAllPosts, 
    getUserPosts, 
    likePost, 
    unlikePost, 
    createPost
} = require('../controllers/postController');

const verifyToken = require('../middleware/authorize'); 

postRouter.get('/', verifyToken, getAllPosts); 
postRouter.get('/user/:id', verifyToken, getUserPosts);
postRouter.patch('/like', verifyToken, likePost); 
postRouter.patch('/unlike', verifyToken, unlikePost);
postRouter.post('/new', verifyToken, createPost);

module.exports = postRouter;