const express = require('express')
const logRouter = express.Router()
const logController = require('../controllers/vehicle')
const {authenticateToken} = require("../middleware/authenticateToken");

logRouter.get('/',authenticateToken,logController.get)

module.exports = vehicleRouter