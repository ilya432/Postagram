
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const logger = require('../../services/logger.service')

async function query(postId) {
    // logger.debug('comment.service > postId: ' + JSON.stringify(postId))
    const posts = await dbService.getCollection('posts')
    try {
        // const comments = await posts.find(criteria).toArray();
        var post = await posts.findOne({ "_id": ObjectId(postId) })
        var comments = post.comments;
        return comments
    } catch (err) {
        console.log('ERROR: cannot find comments')
        throw err;
    }
}
async function remove(commentId) {
    const collection = await dbService.getCollection('comment')
    try {
        await collection.deleteOne({ "_id": ObjectId(commentId) })
    } catch (err) {
        console.log(`ERROR: cannot remove comment ${commentId}`)
        throw err;
    }
}
async function add(comment, postId) {
    comment._id = ObjectId()
    const posts = await dbService.getCollection('posts')
    posts.updateOne(
        { "_id": ObjectId(postId) },
        { $addToSet: { comments: comment } }
    )
    return comment
}


function _buildCriteria(filterBy) {
    const criteria = {};
    return criteria;
}

module.exports = {
    query,
    remove,
    add
}


