require('dotenv').config()

const {Sequelize} = require("sequelize");

// const sequelize = new Sequelize('sqlite::memory:');

const sequelize = new Sequelize(process.env.CONFIG_DB+'?ssl=true', {
    logging: process.env.CONFIG_DEBUG === 'true'
})

module.exports = sequelize
