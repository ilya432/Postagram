const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { addPost, getPosts, getPost, deletePost, likePost, unlikePost, checkLike } = require('./post.controller')
const { addComment, getComments } = require('../comment/comment.controller')//, getComments, deleteComment
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)
router.get('/', getPosts)//requireAuth
router.get('/:id', getPost)//requireAuth
router.get('/:id/comments', getComments)
// router.post('/', requireAuth, addPost)
router.delete('/:id', requireAuth, deletePost)
router.post('/like', likePost)
router.put('/unlike', unlikePost)
router.post('/', addPost)
router.post('/:id/comments', addComment)

module.exports = router