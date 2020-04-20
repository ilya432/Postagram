
const cloudinary = require('cloudinary').v2;
require('dotenv').config()
const logger = require('../../services/logger.service')

cloudinary.config({
    cloud_name: process.env.REACT_APP_CLOUD_NAME,
    api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
    api_secret: process.env.REACT_APP_API_SECRET,
    upload_preset: process.env.REACT_APP_PRESET_NAME

});

// const PRESET_NAME = process.env.REACT_APP_PRESET_NAME;
// const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`


let uploadImage = (imageUrl) => {
    return new Promise((resolve, reject) => {
        try {
            cloudinary.uploader.upload(imageUrl, function (error, res) {
                if (res) {
                    logger.debug('backend service - result: ' + JSON.stringify(res))
                    resolve(res)
                } else {
                    reject(error);
                }
            });
        } catch (err) {
            console.log(`ERROR: Cannot upload image`)
            throw err;
        }
    });
}

module.exports = {
    uploadImage
}


