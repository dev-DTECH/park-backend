const express = require('express')
const authRouter = express.Router();

const authController = require('../controllers/auth')

authRouter.get('/',authController.index.get)
authRouter.post('/login/',authController.login.post)
authRouter.post('/register/',authController.register.post)
authRouter.get('/logout/',authController.logout.get)

module.exports = authRouter
