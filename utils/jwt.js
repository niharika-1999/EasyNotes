require('dotenv').config();
const jwt = require("jsonwebtoken");

exports.generateToken = (email) => {
  return jwt.sign(
    {
      email: email,
    },
    process.env.mySecretKey,
    { expiresIn: "23h" }
  );
};

exports.verifyToken = (token,callback) => {
   return jwt.verify(token, process.env.mySecretKey,(err,data)=>{
    return err ? callback(err, null) : callback(null, data);
   });
};