const logger = require('../../services/logger.service')
const commentService = require('./comment.service')

// TODO: needs error handling! try, catch

async function getComments(req, res) {
    try {
        const comments = await commentService.query(req.query)
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
    console.log('comment' + req.body)
    let comment = req.body.commentObj
    let postId = req.body.postId
    console.log('backend -> comment.controller')
    try {
        await commentService.add(comment, postId)
        res.send()

    } catch (err) {
        logger.error(`Cannot complete adding comment in postId: ${postId} - \n` + err);
    }
}

module.exports = {
    getComments,
    deleteComment,
    addComment
}