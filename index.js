const express = require('express')
var cookies = require("cookie-parser");
const app= express();
const sequelize = require('./utils/db')
const {ParkingSpotModel} = require("./models/parkingSpot");
const {staticFiles} = require("./utils/staticFiles");
sequelize.sync(
    // {force:true}
)
.then(async result => {
    // for (let i = 0; i < 100; i++) {
    //     await ParkingSpotModel.create({
    //         name: `parking spot name ${i}`,
    //         address: `parking spot address ${i}`
    //     })
    // }
    console.log("DB Connected!")
})
// .catch(err => console.log(err))


const PORT = process.env.PORT || 8080
app.use(express.json())
app.use(cookies())
app.use(express.urlencoded({extended:true}))
staticFiles(app)
app.set('view engine','ejs')

app.use(require('./routes/webRoutes/screens'));

// requiring all routes
require("./utils/allRoutes")(app);

app.listen(PORT,()=>{
    console.log(`Live on http://localhost:${PORT}`)
});
