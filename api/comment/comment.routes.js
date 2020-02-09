const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { addComment, getComments, deleteComment } = require('./comment.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)
router.get('/', getComments)//requireAuth
router.post('/', requireAuth, addComment)
router.delete('/:id', requireAuth, deleteComment)

module.exports = router