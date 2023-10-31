const express = require('express');
const userRouter = express.Router();

const {
    getUser, 
    getUsersFriends, 
    getChatFriends,
    addFriend, 
    removeFriend
} = require('../controllers/userController');

const verifyToken = require('../middleware/authorize');

userRouter.get('/:id', verifyToken, getUser);
userRouter.get('/:id/friends', verifyToken, getUsersFriends);
userRouter.post('/friends/chat', verifyToken, getChatFriends);
userRouter.patch('/friend/add', verifyToken, addFriend);
userRouter.patch('/friend/remove', verifyToken, removeFriend);

module.exports = userRouter;