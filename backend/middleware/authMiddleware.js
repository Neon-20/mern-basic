const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//next since this is middleware
const protect = asyncHandler(async function(req,res,next){
     let token;
     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
         try{
           //get token from header
           token = req.headers.authorization.split(" ")[1]

           //Verify the token
           const decoded = jwt.verify(token,process.env.JWT_SECRET)

           //get user from the token
           req.user = await User.findById(decoded.id).select('-password')

           next()
         }
         catch(error){
            console.log(error)
            res.status(401)
            throw new Error("Not Authorized")
         }
     }
     if(!token){
         res.status(401)
         throw new Error("Not Authorized, no token")
     }
})


module.exports = { protect }

//When request is sent from client then the token has Bearer in initials
//That's why starts with Bearer