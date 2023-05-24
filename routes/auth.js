const express = require('express')
const authRouter = express.Router();

const authController = require('../controllers/auth')

authRouter.post('/login/',authController.login)
authRouter.post('/register/',authController.register)
authRouter.get('/logout/',authController.logout)

exports.authRouter = authRouter
