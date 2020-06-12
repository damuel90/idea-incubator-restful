require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 8888,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/ideaincubator',
    APPLICATION_NAME: process.env.APPLICATION_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    CACHE_KEY: process.env.CACHE_KEY,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET
};