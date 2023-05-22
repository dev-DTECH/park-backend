const express = require('express')
const logRouter = express.Router()
const {authenticateToken} = require("../middleware/authenticateToken");
const {logController} = require("../controllers/log");

logRouter.get('/',authenticateToken,logController.get)

exports.logRouter = logRouter