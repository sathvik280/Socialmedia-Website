const express = require('express'); 
const chatRouter = express.Router(); 

const {
    getUserChats, 
    addChat, 
    deleteUserChat
} = require('../controllers/chatController'); 

const verifyToken = require('../middleware/authorize');

chatRouter.post('/', verifyToken, getUserChats);
chatRouter.post('/new', verifyToken, addChat); 
chatRouter.delete('/delete/:id/:userId', verifyToken, deleteUserChat);

module.exports = chatRouter;