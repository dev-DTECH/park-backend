const express = require('express')
var cookies = require("cookie-parser");
const app= express();
const homeRouter = require('./routes/home')
const authRouter = require('./routes/auth')
const vehicleRouter = require('./routes/vehicle')
const sequelize = require('./db')
const User = require('./models/user')
const Vehicle = require('./models/vehicle')

User.hasMany(Vehicle,{
    foreignKey: 'userId'
})
Vehicle.belongsTo(User,{
    foreignKey: 'userId'
})

sequelize.sync()
// .then(result => console.log(result))
// .catch(err => console.log(err))


const PORT = 8080
app.use(express.json())
app.use(cookies())
app.use(express.urlencoded({extended:false}))

app.set('view engine','ejs')


app.use('/',homeRouter)
app.use('/auth',authRouter)
app.use('/vehicle',vehicleRouter)

app.listen(PORT,()=>{
    console.log(`Live on http://localhost:${PORT}`)
});