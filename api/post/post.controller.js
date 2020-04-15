const logger = require('../../services/logger.service')
const postService = require('./post.service')

async function getPosts(req, res) {
    try {
        const posts = await postService.query(req.query)
        res.send(posts)
    } catch (err) {
        logger.error('query - Cannot get posts', err);
        res.status(500).send({ error: 'query - cannot get posts' })

    }
}

async function getPost(req, res) {
    let postId = req.params.id
    try {
        logger.debug('controller -> postId: ' + JSON.stringify(postId))
        // const post = await postService.getPost(JSON.stringify(postId))
        const post = await postService.getPost(postId)
        // logger.debug('post: ' + post)
        // return post;
        res.send(post)
    } catch (err) {
        logger.error('getOnePost - Cannot get post', err);
        res.status(500).send({ error: 'getOnePost - cannot get post' })
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
    // logger.debug('sdgadav: ')
    await postService.remove(req.params.id)
    res.end()
}

async function likePost(req, res) {
    let likedBy = req.body.likedByObj
    let postId = req.body.postId
    try {
        var result = await postService.likePost(likedBy, postId)
        res.json(result)
    } catch (err) {
        logger.error(`Cannot complete like on post id: ${postId} - \n` + err);
    }
}

async function unlikePost(req, res) {
    let unlikedBy = req.body.unlikedByObj
    let postId = req.body.postId
    try {
        var result = await postService.unlikePost(unlikedBy, postId)
        res.json(result)

    } catch (err) {
        logger.error(`Cannot complete unlike on post id: ${postId} - \n` + err);
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