const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { uploadImage } = require('./upload.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.post('/upload', uploadImage)

module.exports = router