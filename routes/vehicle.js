const express = require('express')
const vehicleRouter = express.Router()
const vehicleController = require('../controllers/vehicle')
const authController = require("../controllers/auth");
const {authenticateToken} = require("../middleware/authenticateToken");

vehicleRouter.get('/',authenticateToken,vehicleController.get)
vehicleRouter.post('/add/',authenticateToken,vehicleController.add.post)
vehicleRouter.post('/delete/',authenticateToken,vehicleController.delete.post)

module.exports = vehicleRouter