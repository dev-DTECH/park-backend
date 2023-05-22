const User = require('../models/user')
const Log = require('../models/log')
const {VehicleModel} = require("../models/vehicle");
const {getParkingSpotId, parkingSpotController} = require("./parkingSpot");
const {checkIn, logController} = require("./log");

module.exports = {
    get: async (req, res) => {
        const vehicle = await VehicleModel.findAll({
            where: {
                userId: req.user.userId
            },

        })
        // const parkingSpotId = await getParkingSpotId()
        // getParkingSpotId().map(e=>{console.log(e.parkingSpotId)})
        res.render('vehicle', {
            vehicle: vehicle,
            parkingSpotId: await parkingSpotController.getParkingSpotId()
        })

    },
    add: {
        post: async (req, res) => {
            const isVehicleParked = await VehicleModel.findOne({
                where:{
                    vehicleNumber: req.body.vehicleNumber
                }
            })
            if(isVehicleParked) return res.status(409).json({ error : "Vehicle already parked" })
            const vehicle = await VehicleModel.create({
                userId: req.user.userId,
                vehicleNumber: req.body.vehicleNumber
            })
            logController.checkIn(vehicle.vehicleId,req.user.userId,req.body.parkingSpotId)
            return res.redirect('/vehicle/')
        }
    },
    delete: {
        post: async (req, res) => {
            await VehicleModel.destroy({
                where: {
                    vehicleId: req.body.vehicleId,
                    userId: req.user.userId
                },
                force:true
            })
            logController.checkOut(req.body.vehicleId)
            return res.redirect('/vehicle/')
        }
    }
}