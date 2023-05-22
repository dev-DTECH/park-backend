const {ParkingSpotModel} = require("../models/parkingSpot");
exports.parkingSpotController ={}
exports.parkingSpotController.getParkingSpotId = async () => {
     return await ParkingSpotModel.findAll({
         attributes: ['parkingSpotId']
     })
}