
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const logger = require('../../services/logger.service')

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('posts')
    try {
        const posts = await collection.find(criteria).toArray();
        // var posts = await collection.aggregate([
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

        // posts = posts.map(post => {
        //     post.byUser = { _id: post.byUser._id, username: post.byUser.username }
        //     post.aboutUser = { _id: post.aboutUser._id, username: post.aboutUser.username }
        //     delete post.byUserId;
        //     delete post.aboutUserId;
        //     return post;
        // })
        return posts
    } catch (err) {
        console.log('ERROR: cannot find posts')
        throw err;
    }
}
async function remove(postId) {
    logger.debug('remove id: ' + postId)
    const collection = await dbService.getCollection('posts')
    try {
        await collection.deleteOne({ "_id": ObjectId(postId) })
    } catch (err) {
        console.log(`ERROR: cannot remove post ${postId}`)
        throw err;
    }
}
async function add(post) {
    post._id = ObjectId(post.post);
    const collection = await dbService.getCollection('posts')
    try {
        await collection.insertOne(post);
        return post;
    } catch (err) {
        console.log(`ERROR: cannot insert post`)
        throw err;
    }
}





// async function update(user) {
//     const collection = await dbService.getCollection('user')
//     user._id = ObjectId(user._id);

//     try {
//         await collection.replaceOne({ "_id": user._id }, { $set: user })
//         return user
//     } catch (err) {
//         console.log(`ERROR: cannot update user ${user._id}`)
//         throw err;
//     }
// }

async function likePost(liker, postId) {
    const posts = await dbService.getCollection('posts')
    posts.updateOne(
        { "_id": ObjectId(postId) },
        { $addToSet: { likedBy: liker } }
    )
    const likedPost = await posts.findOne({ "_id": ObjectId(postId) })
    return await likedPost
}
async function unlikePost(liker, postId) {
    const posts = await dbService.getCollection('posts');
    posts.updateOne(
        { "_id": ObjectId(postId) },
        { $pull: { likedBy: liker } }
    )
    const unlikedPost = await posts.findOne({ "_id": ObjectId(postId) })
    return await unlikedPost
}


function _buildCriteria(filterBy) {
    const criteria = {};
    return criteria;
}

module.exports = {
    query,
    remove,
    add,
    likePost,
    unlikePost
}


