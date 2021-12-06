require('dotenv').config();
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
/**
 * @description  To generate token for the user
 * @returns object containing message&token
 */
exports.generateToken = (_id) => {
  return jwt.sign(
    {
      _id:_id
    },
    process.env.mySecretKey,
    { expiresIn: "24h" }
  );
};

/**
 * @description Verifies the token to authorize user
 */
exports.verifyToken = (token,callback) => {
   return jwt.verify(token, process.env.mySecretKey,(err,data)=>{
    return err ? callback(err, null) : callback(null, data);
   });
};

exports.generateRandomCode = () => {
  return crypto.randomBytes(20).toString('hex');
}
