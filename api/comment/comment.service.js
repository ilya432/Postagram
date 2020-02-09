
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const logger = require('../../services/logger.service')

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    // console.log('criteria: ' + criteria[2])
    const collection = await dbService.getCollection('comment')
    try {
        const comments = await collection.find(criteria).toArray();
        // var comments = await collection.aggregate([
        //     { $match: filterBy },
        //     {
        //         $lookup:
        //         {
        //             from: 'user',
        //             localField: 'byUserId',
        //             foreignField: '_id',
        //             as: 'byUser'
        //         }
        //     },
        //     { $unwind: '$byUser' },
        //     {
        //         $lookup:
        //         {
        //             from: 'user',
        //             localField: 'aboutUserId',
        //             foreignField: '_id',
        //             as: 'aboutUser'
        //         }
        //     },
        //     { $unwind: '$aboutUser' }
        // ]).toArray()

        comments = comments.map(comment => {
            comment.byUser = { _id: comment.byUser._id, username: comment.byUser.username }
            comment.aboutUser = { _id: comment.aboutUser._id, username: comment.aboutUser.username }
            delete comment.byUserId;
            delete comment.aboutUserId;
            return comment;
        })
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
    // comment._id = ObjectId(comment.comment);
    const posts = await dbService.getCollection('posts')
    posts.updateOne(
        { "_id": ObjectId(postId) },
        { $addToSet: { comments: comment } }
    )
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


