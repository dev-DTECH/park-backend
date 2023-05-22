const express = require('express')
var cookies = require("cookie-parser");
const app= express();
const homeRouter = require('./routes/home')
const authRouter = require('./routes/auth')
const vehicleRouter = require('./routes/vehicle')
const sequelize = require('./db')
const User = require('./models/user')
const {VehicleModel} = require("./models/vehicle");
const {ParkingSpotModel} = require("./models/parkingSpot");
const {logRouter} = require("./routes/log");
const {LogModel} = require("./models/log");

sequelize.sync(
    {force:true}
)
.then(async result => {
    // console.log(result)
    for (let i = 0; i < 100; i++) {
        await ParkingSpotModel.create({
            name: `parking spot name ${i}`,
            address: `parking spot address ${i}`
        })
    }
})
// .catch(err => console.log(err))


const PORT = 8080
app.use(express.json())
app.use(cookies())
app.use(express.urlencoded({extended:false}))

app.set('view engine','ejs')


app.use('/',homeRouter)
app.use('/auth',authRouter)
app.use('/vehicle',vehicleRouter)
app.use('/log',logRouter)

app.listen(PORT,()=>{
    console.log(`Live on http://localhost:${PORT}`)
});