const sequelize = require("../utils/db");
const {DataTypes} = require("sequelize");
const {UserModel} = require("./user");

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
            model: UserModel,
            key: 'userId'
        },
    },
    vehicleId: DataTypes.UUID,
    checkInTime: DataTypes.DATE,
    checkOutTime: DataTypes.DATE,
    duration: DataTypes.INTEGER
})

exports.LogModel = LogModel