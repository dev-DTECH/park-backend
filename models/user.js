const sequelize = require('../utils/db')
const {Sequelize, DataType, DataTypes} = require("sequelize");

const UserModel = sequelize.define('User', {
    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    mobileNumber: DataTypes.STRING,
    password: DataTypes.STRING
})
exports.UserModel = UserModel