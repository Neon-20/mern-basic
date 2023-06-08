const express = require('express')
const router = express.Router();
const { registerUser } = require('../controller/userController')
const { loginUser } = require('../controller/userController')
const { getMe } = require('../controller/userController')

const {protect} = require('../middleware/authMiddleware')
router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/me',protect,getMe)



module.exports = router