require('dotenv').config()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    index: {
        get: (req, res) => {
            res.render('auth')
        }
    },
    login: {
        post: async (req, res, next) => {
            // console.dir(req.body)
            const user = await User.findOne({
                where: {
                    mobileNumber: req.body.mobileNumber,
                }
            })
            // const allUser = await User.findAll()

            // console.log(user,allUser)
            if (!user){
                res.status(404).json({ error : "User does not exist" })
            }

            else {
                const password_valid = await bcrypt.compare(req.body.password, user.password);
                if (password_valid) {
                    const token = jwt.sign({
                        "userId": user.userId,
                        "mobileNumber": user.mobileNumber,
                        "name": user.name
                    }, process.env.ACCESS_TOKEN_SECRET);
                    res.cookie('token',token,{
                        httpOnly: true
                    })
                    res.status(200)
                    return res.redirect('/')
                } else {
                    res.status(400).json({error: "Password Incorrect"});
                }
            }

        }
    },
    register: {
        post: async (req, res) => {
            const oldUser = await User.findOne({
                where: {
                    mobileNumber: req.body.mobileNumber,
                }
            })
            if(oldUser){
                return res.status(409).json({ error : "User already exist" })
            }
            // console.log(req.body)

            const salt = await bcrypt.genSalt(10);
            const user = await User.create({
                name: req.body.name,
                mobileNumber: req.body.mobileNumber,
                password: await bcrypt.hash(req.body.password, salt)
            })
            const token = jwt.sign({
                "userId": user.userId,
                "mobileNumber": user.mobileNumber,
                "name": user.name
            }, process.env.ACCESS_TOKEN_SECRET);
            res.cookie('token',token,{
                httpOnly: true
            })
            // const allUser = await User.findAll()
            //
            // console.log(user)
            res.redirect('/')
        }
    },
    logout:{
        get: async (req,res)=>{
            res.clearCookie("token");
            res.redirect('/')
        }
    }
}
