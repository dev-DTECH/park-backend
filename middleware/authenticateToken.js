const jwt = require("jsonwebtoken");
const {compareSync} = require("bcrypt");
exports.authenticateToken = (req,res,next) => {
    const token = req.cookies.token
    try{
        const user = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        req.user = user
        // console.log(user)
        next()
    }
    catch (err){
        res.clearCookie("token");
        return res.redirect('/')
    }
}
