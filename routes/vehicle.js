const express = require('express')
const vehicleRouter = express.Router()
const vehicleController = require('../controllers/vehicle')
const authController = require("../controllers/auth");
const {authenticateToken} = require("../middleware/authenticateToken");

vehicleRouter.post('/addVehicle/',authenticateToken,vehicleController.addVehicle)
vehicleRouter.post('/deleteVehicle/',authenticateToken,vehicleController.deleteVehicle)

exports.vehicleRouter = vehicleRouter