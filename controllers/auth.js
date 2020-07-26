const User = require('../models/User');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require("express-async-handler");
const sendJwtToClient = require('../helpers/authorization/sendJwtToClient');

const register = asyncErrorWrapper(async (req,res,next) => {
    
    const {name,email,password,role} = req.body;
    const user = await User.create({
        name: name,
        email: email,
        password: password
    });
    sendJwtToClient(user, res);
});

const errorTest = (req,res,next) => {
    //Some Code
    return next(new CustomError("Bu bir hata Denemesidir. Custom ERROR MESSAGE", 400));
    //Some Code
};

module.exports = {
    register,
    errorTest
};