const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const ParkingSpotModel = sequelize.define('ParkingSpot',{
    parkingSpotId:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    name: DataTypes.STRING,
    address: DataTypes.STRING
})
exports.ParkingSpotModel = ParkingSpotModel