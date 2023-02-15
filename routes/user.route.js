const express = require('express')
const router = express.Router();
const { register, login, logout,verifyOtp} = require('../middleware/user')


router.post('/register', register)
router.get('/logout', logout)
router.post('/login', login)
router.post('/verify-otp', verifyOtp)

module.exports = router