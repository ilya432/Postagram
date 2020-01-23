
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
// import axios from 'axios'
// const cloudinary = require('cloudinary').v2
// var cloudinaryConfig = {
//     cloud_name: 'ilya432',
//     api_key: '796597933171765',
//     api_secret: 'UOrgge2sLbm_EveKUC5VfZl7z3M'
// }

async function query(filterBy = {}) {
    // const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('posts')
    try {
        // const reviews = await collection.find(criteria).toArray();

        var reviews = await collection.aggregate([
            {
                $match: filterBy
            },
            {
                $lookup:
                {
                    from: 'users',
                    localField: 'byUserId',
                    foreignField: '_id',
                    as: 'byUser'
                }
            },
            {
                $unwind: '$byUser'
            }
            ,
            {
                $lookup:
                {
                    from: 'posts',
                    localField: 'postId',
                    foreignField: '_id',
                    as: 'post'
                }
            },
            {
                $unwind: '$post'
            }







            // ,
            // {
            //     $lookup:
            //     {
            //         from: 'users',
            //         localField: 'aboutUserId',
            //         foreignField: '_id',
            //         as: 'aboutUser'
            //     }
            // },
            // {
            //     $unwind: '$aboutUser'
            // }
        ]).toArray()

        reviews = reviews.map(review => {
            review.byUser = { _id: review.byUser._id, username: review.byUser.username }
            review.aboutUser = { _id: review.aboutUser._id, username: review.aboutUser.username }
            delete review.byUserId;
            delete review.aboutUserId;
            return review;
        })

        return reviews
    } catch (err) {
        console.log('ERROR: cannot find reviews')
        throw err;
    }
}
async function remove(reviewId) {
    const collection = await dbService.getCollection('review')
    try {
        await collection.deleteOne({ "_id": ObjectId(reviewId) })
    } catch (err) {
        console.log(`ERROR: cannot remove review ${reviewId}`)
        throw err;
    }
}
async function add(review) {
    review.byUserId = ObjectId(review.byUserId);
    review.aboutUserId = ObjectId(review.aboutUserId);

    const collection = await dbService.getCollection('review')
    try {
        await collection.insertOne(review);
        return review;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}
function _buildCriteria(filterBy) {
    const criteria = {};
    return criteria;
}
async function uploadImage(image) {
    try {
        // await collection.insertOne(review);
        return imgUrl;
    } catch (err) {
        console.log(`ERROR: Cannot upload image`)
        throw err;
    }
}

module.exports = {
    query,
    remove,
    add,
    uploadImage
}


