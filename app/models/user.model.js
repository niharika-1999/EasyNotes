/**
 * @file            : user.model.js
 * @author          : Niharika Rao
 * @since           : 15-10-2021
 */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtHelper = require("../../utils/jwt");


const UserSchema = mongoose.Schema({
    firstName: {type: String, required: true}, 
    lastName: {type: String},
    email: {type: String,  unique: true, required: true},
    password: {type: String},
    resetPasswordToken: {type: String},
    resetPasswordExpires: Date,
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

var encryptPassword;

class userModels {
    /**
   * @description  login for a User
   * @param {Object} object
   * @param {callback} callback
   * @returns error or callback
   */
    loginUser = (object, callback) => {
        return User.findOne({ email: object.email }, (err, data) => {
            return err ? callback(err, null) : data == null ? callback("Email ID isn't present", null) : callback(null, data);
        });
    };

    /**
   * @description Create a User and save user in the database
   * @param {Object} object
   * @param {callback} callback
   * @returns error or callback
   */
    createUser = (object,callback) => {
        encryptPassword = bcrypt.hashSync(object.password, 10);
        const newUser = new User({
            firstName: object.firstName,
            lastName: object.lastName,
            email: object.email,
            password: encryptPassword,
        });
        return newUser.save((err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    };

     /**
   * @description To find all users
   * @param {callback} callback
   * @returns error or callback
   */
    findUser = (callback) => {
        return User.find((err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    }

     /**
   * @description To find one single user
   * @param {String} email
   * @param {callback} callback
   * @returns error or callback
   */
    findOneUser = (email, callback) => {
        User.findById({ email: email }, (err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    }

    /**
   * @description To find and update the user details
   * @param {String} findId
   * @param {Object} object
   * @param {callback} callback
   * @returns error or data
   */
    updateUser = (findId, object, callback) => {
        User.findByIdAndUpdate(findId, { firstName: object.firstName, lastName: object.lastName, email: object.email,}, { new: true },
            (err, data) => {
                return err ? callback(err, null) : callback(null, data);
            });
    }

    /**
   * @description To find and remove an user id as a parameter
   * @param {String} findId
   * @param {callback} callback
   * @returns
   */
    deleteUser = (findId, callback) => {
        User.findByIdAndRemove(findId, (err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    }

    /**
   * @description Forgot password creates token if email id is found
   * @param {String} email
   * @returns data or error
   */
    forgotPassword = (email) => {
        return User
            .findOne({ email: email })
            .then((data) => {
                if (!data) {
                    throw "Email not found";
                } else {
                    let randomToken = jwtHelper.generateRandomCode();
                    data.resetPasswordToken = randomToken;
                    data.resetPasswordExpires = Date.now() + 3600000;
                    return data.save()
                        .then((res) => { return res; })
                        .catch((err) => { throw err; });
                }
            })
            .catch((err) => {
                throw err;
            });
    }

    /**
   * @description if token is valid then resets password
   * @param {String} token
   * @param {String} newPassword
   * @returns  error or data
   */
    resetPassword = (token, newPassword) => {
        return User
            .findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() }, })
            .then((data) => {
                if (!data) {
                    throw "Token not found";
                } else {
                    encryptPassword = bcrypt.hashSync(newPassword, 10);
                    (data.password = encryptPassword),
                        (data.resetPasswordToken = undefined),
                        (data.resetPasswordExpires = undefined);
                    return data.save()
                        .then((data) => { return data; })
                        .catch((err) => { throw err; });
                }
            })
            .catch((err) => {
                throw err;
            });
    }
}

module.exports = new userModels();