const express = require('express')
const { handelGenerateNewShortURL, handleGetAnalytics } = require('../controller/urlController')
const router = express.Router()

router.post('/', handelGenerateNewShortURL)

router.get('./analytics/:shortId', handleGetAnalytics)


module.exports = router;