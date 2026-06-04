const jwt = require("jsonwebtoken");
const { ENV } = require("./env.js");

const generateToken = (userID,res) => {
    const token = jwt.sign({userID}, ENV.JWT_SECRET,{
        expiresIn: "7d",
 });

 res.cookie("jwt", token, {
   maxAge: 7 * 24 * 60 * 1000,
   httpOnly: true,
   sameSite: "strict",
   secure: process.env.NODE_ENV === "development" ? false : true,
 });

 return token;
};

module.exports = generateToken;