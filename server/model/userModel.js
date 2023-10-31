const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 30
    },

    email: {
        type: String,
        required: true,
        max: 30,
        unique: [true, 'Email already registered']
    },

    password: {
        type: String,
        required: true, 
        min: 5 
    },

    friends: {
        type: Array,
        default: [] 
    },

    imageName: {
        type: String,
        required: true
    },

    imageUrl: {
        type: String,
        required: true
    },

    location: {
        type: String, 
        required: true 
    }, 

    occupation: {
        type: String, 
        required: true 
    }
}, {timestamps: true} );

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;