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

async function addPost(req, res) {
    var post = req.body;
    // logger.error('req -> post: ', post);
    // post._id = req.session.user._id;
    post = await postService.add(post)
    res.send(post)
}








async function deletePost(req, res) {
    await postService.remove(req.params.id)
    res.end()
}





async function likePost(req, res) {
    let likedBy = req.body.likedByObj
    let postId = req.body.postId
    console.log('backend -> post.controller')
    await postService.likePost(likedBy, postId)
    res.send()
}











module.exports = {
    getPosts,
    deletePost,
    addPost,
    likePost
}