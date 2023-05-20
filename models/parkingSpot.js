const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const Log = sequelize.define('ParingSpot',{
    parkingSpotId:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    name: DataTypes.STRING,
    address: DataTypes.STRING
})

module.exports = Log