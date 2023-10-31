const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    chatId: {
        type: String, 
        required: true 
    }, 

    senderId: {
        type: String, 
        required: true 
    }, 

    receiverId: {
        type: String, 
        required: true 
    }, 

    message: {
        type: String, 
        required: true 
    }
}, {timestamps: true} );

const chatModel = mongoose.model('Chat', chatSchema); 

module.exports = chatModel;