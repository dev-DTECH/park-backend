const {LogModel} = require("../models/log");
exports.logController = {}

exports.logController.get = async (req, res) => {
    const log = await LogModel.findAll()
    res.render('log', {
        log: log,
    })
}
exports.logController.checkIn = async (vehicleId, userId, parkingSpotId) => {
    console.error(parkingSpotId)
    const log = await LogModel.create({
        vehicleId: vehicleId,
        userId: userId,
        parkingSpotId: parkingSpotId,
        checkInTime: Date.now()
    })
}
exports.logController.checkOut = async (vehicleId) => {
    try {
        const log = await LogModel.findOne({
            where: {
                vehicleId: vehicleId
            }
        })
        log.checkOutTime = new Date()
        log.duration = (log.checkOutTime - log.checkInTime)
        await log.save()
    } catch (e) {
        console.error(e)
    }
}