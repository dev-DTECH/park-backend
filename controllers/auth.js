require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {UserModel} = require("../models/user");

exports.login = async (req, res, next) => {
    // console.dir(req.body)
    const user = await UserModel.findOne({
        where: {
            mobileNumber: req.body.mobileNumber,
        }
    })

    if (!user) {
        res.status(404).json({error: "UserModel does not exist"})
    } else {
        const password_valid = await bcrypt.compare(req.body.password, user.password);
        if (password_valid) {
            const token = jwt.sign({
                "userId": user.userId,
                "mobileNumber": user.mobileNumber,
                "name": user.name
            }, process.env.ACCESS_TOKEN_SECRET);
            res.cookie('token', token, {
                httpOnly: true
            })
            res.status(200)
            return res.redirect('/')
        } else {
            res.status(400).json({error: "Password Incorrect"});
        }
    }
}

exports.register = async (req, res) => {
    const isUserModelRegistered = await UserModel.findOne({
        where: {
            mobileNumber: req.body.mobileNumber,
        }
    })
    if (isUserModelRegistered) {
        return res.status(409).json({error: "UserModel already exist"})
    }
    const salt = await bcrypt.genSalt(10);
    const user = await UserModel.create({
        name: req.body.name,
        mobileNumber: req.body.mobileNumber,
        password: await bcrypt.hash(req.body.password, salt)
    })
    const token = jwt.sign({
        "userId": user.userId,
        "mobileNumber": user.mobileNumber,
        "name": user.name
    }, process.env.ACCESS_TOKEN_SECRET);
    res.cookie('token', token, {
        httpOnly: true
    })
    res.redirect('/')
}
exports.logout = async (req, res) => {
    res.clearCookie("token");
    res.redirect('/')
}