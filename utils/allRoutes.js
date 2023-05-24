const {vehicleRouter} = require("../routes/vehicle");
const {authRouter} = require("../routes/auth");
const All_Routes = (app)=> {
    app.use(
        '/v1/',
        authRouter,
        vehicleRouter,
    )
};


module.exports = All_Routes;