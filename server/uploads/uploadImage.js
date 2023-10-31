const { v2: cloudinary } = require('cloudinary');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET 
});

const uploadImage = (base64, folder) => {
    return cloudinary.uploader.upload(base64, {
        folder,
        resource_type: 'image'
    });
};

module.exports = uploadImage;