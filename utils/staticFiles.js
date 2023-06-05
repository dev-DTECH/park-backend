const {static} = require("express");
exports.staticFiles = (app) =>{
    app.use('/static/',static('public'))
}