const logger = require('../../services/logger.service')
const commentService = require('./comment.service')

async function getComments(req, res) {
    // logger.debug('comment.controller > postId: ' + req.params.id)
    try {
        const comments = await commentService.query(req.params.id)
        res.send(comments)
    } catch (err) {
        logger.error('Cannot get comments', err);
        res.status(500).send({ error: 'cannot get comments' })
    }
}
async function deleteComment(req, res) {
    await commentService.remove(req.params.id)
    res.end()
}
async function addComment(req, res) {
    let comment = req.body.commentObj
    let postId = req.body.postId
    try {
        comment = await commentService.add(comment, postId)
        res.send(comment)

    } catch (err) {
        logger.error(`Cannot complete adding comment in postId: ${postId} - \n` + err);
    }
}

module.exports = {
    getComments,
    deleteComment,
    addComment
}