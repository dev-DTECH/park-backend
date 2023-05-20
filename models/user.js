const sequelize = require('../db')
const {Sequelize, DataType, DataTypes} = require("sequelize");

const User = sequelize.define('User', {
    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    mobileNumber: DataTypes.STRING,
    password: DataTypes.STRING
})
module.exports = User