const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true 
    },

    userName: {
        type: String,
        required: true
    },

    userLocation: {
        type: String,
        required: true 
    }, 

    userOccupation: {
        type: String,
        required: true 
    },

    userImageName: {
        type: String,
        required: true 
    },

    userImageUrl: {
        type: String,
        required: true
    },

    postImageName: {
        type: String,
        required: true
    },

    postImageUrl: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true 
    },

    likes: {
        type: Map,
        default: new Map()
    }
}, {timestamps: true} );

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;