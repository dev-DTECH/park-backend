const express = require('express')
const homeRouter = express.Router()
const homeController = require('../controllers/home')
const {authenticateToken} = require("../middleware/authenticateToken");

homeRouter.get('/',homeController.get)

module.exports = homeRouter