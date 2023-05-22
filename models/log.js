const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const User = require('../models/user')
const {VehicleModel} = require("./vehicle");

const LogModel = sequelize.define('Log', {
    parkingSpotId: {
        type: DataTypes.INTEGER,
        references:{
            model: 'ParkingSpots',
            key: 'parkingSpotId'
        }
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'userId'
        },
    },
    vehicleId: DataTypes.UUID,
    checkInTime: DataTypes.DATE,
    checkOutTime: DataTypes.DATE,
    duration: DataTypes.TIME
})

exports.LogModel = LogModel