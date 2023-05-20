const Vehicle = require("../models/vehicle");
const User = require('../models/user')
const Log = require('../models/log')

module.exports = {
    get: async (req, res) => {
        const vehicle = await Vehicle.findAll({
            include:[
                {
                    model:User,
                    required:true
                }
            ],
            where: {
                userId: req.user.userId
            },

        })
        // vehicle.map(e=>{console.log(e.User.name)})
        res.render('vehicle', {
            vehicle: vehicle
        })
    },
    add: {
        post: async (req, res) => {
            const oldVehicle = await Vehicle.findOne({
                where:{
                    vehicleNumber: req.body.vehicleNumber
                }
            })
            if(oldVehicle) return res.status(409).json({ error : "Vehicle already parked" })
            const vehicle = await Vehicle.create({
                userId: req.user.userId,
                vehicleNumber: req.body.vehicleNumber
            })
            // const log = Log.create({
            //     userId: req.user.userId,
            //     vehicleId: vehicle.vehicleId,
            //     checkInTime: Date.now()
            // })
            return res.redirect('/vehicle/')
        }
    },
    delete: {
        post: async (req, res) => {
            await Vehicle.destroy({
                where: {
                    vehicleId: req.body.vehicleId,
                    userId: req.user.userId
                }
            })
            return res.redirect('/vehicle/')
        }
    }
}