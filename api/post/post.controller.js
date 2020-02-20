const logger = require('../../services/logger.service')
const postService = require('./post.service')

async function getPosts(req, res) {
    try {
        const posts = await postService.query(req.query)
        res.send(posts)
    } catch (err) {
        logger.error('Cannot get posts', err);
        res.status(500).send({ error: 'cannot get posts' })

    }
}
async function getPost(req, res) {
    try {
        const posts = await postService.query(req.query)
        res.send(posts)
    } catch (err) {
        logger.error('Cannot get post', err);
        res.status(500).send({ error: 'cannot get post' })

    }
}
async function addPost(req, res) {
    var post = req.body;
    // logger.error('req -> post: ', post);
    // post._id = req.session.user._id;
    post = await postService.add(post)
    res.send(post)
}

async function deletePost(req, res) {
    logger.debug('sdgadav: ')
    await postService.remove(req.params.id)
    res.end()
}





async function likePost(req, res) {
    let likedBy = req.body.likedByObj
    let postId = req.body.postId
    console.log('backend -> post.controller')
    try {
        await postService.likePost(likedBy, postId)
        res.send()

    } catch (err) {
        logger.error(`Cannot complete like on post if: ${postId} - \n` + err);
    }
}

async function unlikePost(req, res) {
    let unlikedBy = req.body.likedByObj
    let postId = req.body.postId
    console.log('backend -> post.controller')
    try {
        await postService.unlikePost(unlikedBy, postId)
        res.send()

    } catch (err) {
        logger.error(`Cannot complete unlike on post if: ${postId} - \n` + err);
    }
}










module.exports = {
    getPosts,
    getPost,
    deletePost,
    addPost,
    likePost,
    unlikePost
}