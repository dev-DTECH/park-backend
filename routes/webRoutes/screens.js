const express = require("express");
const jwt = require("jsonwebtoken");
const {LogModel} = require("../../models/log");
const {VehicleModel} = require("../../models/vehicle");
const {parkingSpotController} = require("../../controllers/parkingSpot");
const {authenticateToken} = require("../../middleware/authenticateToken");
const router = express.Router();

router.get('/', (req, res) => {
    const token = req.cookies.token
    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        res.render('index', {
            user: user
        })
    } catch (err) {
        res.render('index')
    }
})

router.get('/auth',(req, res) => {
    res.render('auth')
})

router.get('/vehicle', authenticateToken, async (req, res) => {
    const vehicle = await VehicleModel.findAll({
        where: {
            userId: req.user.userId
        },
    })

    res.render('vehicle', {
        vehicle: vehicle,
        parkingSpotId: await parkingSpotController.getParkingSpotId()
    })

})

router.get('/log', authenticateToken, async (req, res) => {
    const log = await LogModel.findAll()
    res.render('log', {
        log: log,
    })
})

module.exports = router
