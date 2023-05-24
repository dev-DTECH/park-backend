const {VehicleModel} = require("../models/vehicle");
const {logController} = require("./log");

exports.addVehicle = async (req, res) => {
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
exports.deleteVehicle = async (req, res) => {
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