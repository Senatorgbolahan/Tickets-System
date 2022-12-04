const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const { nextTick } = require('process');


const protect = asyncHandler(async(req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        try {
            //************************ Get token from header
            token = req.headers.authorization.split(' ')[1]
                //************************ verify
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
                //************************ get user from token
            req.user = await User.findById(decoded.id).select('-password')
                // req.user = { id: decoded.id }
            next()
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not Authorized')
        }
    }


    if (!token) {
        res.status(401)
        throw new Error('Not Authorized')
    }
})

module.exports = { protect };