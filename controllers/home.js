const jwt = require("jsonwebtoken");
module.exports = {
    get: (req, res) => {
        const token = req.cookies.token
        try {
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            res.render('index', {
                user: user
            })
        }
        catch (err){
            res.render('index')
        }
    }
}