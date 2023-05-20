const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const Log = sequelize.define('Log', {
    parkingSpotId: {
        type: DataTypes.UUID,
        references:{
            model: 'ParkingSpots',
            key: 'parkingSpotId'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'userId'
        },
    },
    vehicleId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Vehicles',
            key: 'vehicleId'
        }
    },
    checkInTime: DataTypes.DATE,
    checkOutTime: DataTypes.DATE,
    duration: DataTypes.TIME


})

module.exports = Log