const logger = require('../../services/logger.service')
const uploadService = require('./upload.service')

async function uploadImage(req, res, next) {
    try {
        // logger.debug('backend controller req.body: ' + req.body.imgUrl)

        var result = await uploadService.uploadImage(req.body.imgUrl)
        // .then(res => logger.debug('backend controller - res ' + JSON.stringify(res)))
        // .then(res => res.json())

        // logger.debug('backend controller - result:: ' + JSON.stringify(result))
        res.json(result)
        // res.json(result)
        // response.send()
        // return result;
    } catch (err) {
        logger.error('controller - Cannot upload image', err);
        res.status(500).send({ error: 'Cannot upload image' })
    }
}
module.exports = {
    uploadImage
}