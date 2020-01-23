const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { addPost, getPosts, deletePost, likePost } = require('./post.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)
router.get('/', getPosts)//requireAuth
// router.post('/', requireAuth, addPost)
router.delete('/:id', requireAuth, deletePost)
router.post('/like', likePost)
router.post('/', addPost)

module.exports = router