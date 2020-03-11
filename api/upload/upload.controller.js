const logger = require('../../services/logger.service')
const uploadService = require('./upload.service')

async function uploadImage(req, res, next) {
    try {
        var file = req.files.photo;
        // console.log(file)
        // const image = await uploadService.uploadImage(req.query)
        res.send(file)
    } catch (err) {
        logger.error('Cannot upload image', err);
        res.status(500).send({ error: 'Cannot upload image' })
    }
}
module.exports = {
    uploadImage
}