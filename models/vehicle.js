const sequelize = require('../db')
const {DataTypes} = require("sequelize");
const Vehicle = sequelize.define('Vehicle',{
    vehicleId:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    vehicleNumber: DataTypes.STRING,
    userId: {
        type: DataTypes.INTEGER,

        references:{
            model: 'Users',
            key: 'userId'
        }
    }
})

module.exports = Vehicle