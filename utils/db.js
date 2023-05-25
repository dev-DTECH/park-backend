require('dotenv').config()

const {Sequelize} = require("sequelize");

// const sequelize = new Sequelize('sqlite::memory:');

const sequelize = new Sequelize(process.env.CONFIG_DB+(process.env.CONFIG_SSL === "true"? "?ssl=true": ""), {
    logging: process.env.CONFIG_DEBUG === 'true',
    ssl:{
        require: true,
        rejectUnauthorized: false
    }
})

module.exports = sequelize
