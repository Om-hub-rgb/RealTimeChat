const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const { ENV } = require("../lib/env.js");



const protectRoute = async (req, res, next) => {
    try {
        console.log("URL:", req.originalUrl);
        console.log("Cookies:", req.cookies);
       

        const token = req.cookies.jwt;
        if(!token) return res.status(401).json({message:"Unauthorized - No token provided"});

        console.log("Decoded:", jwt.verify(token, ENV.JWT_SECRET));

        const decoded = jwt.verify(token,ENV.JWT_SECRET);
          if(!decoded) return res.status(401).json({message:"Unauthorized - Invalid token"});
            
        const user = await User.findById(decoded.userID).select("-password");
          if(!user) return res.status(404).json({message:"User not found"});

        req.user = user;

        console.log("User set in middleware:", req.user?._id);
        next();

    } catch (error) {
        console.log("Error in protectRoute middleware:",error);
        res.status(500).json({message:"internal server error"});
    }
};

module.exports = protectRoute;