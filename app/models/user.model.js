const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtHelper = require("../../utils/jwt");


const UserSchema = mongoose.Schema({
    firstName: {type: String, required: true}, 
    lastName: {type: String},
    email: {type: String,  unique: true, required: true},
    phNumber: {type: String, required: true},
    password: {type: String},
    resetPasswordToken: {type: String},
    resetPasswordExpires: Date,
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

var encryptPassword;

class userModels {
    //user login
    loginUser = (object, callback) => {
        return User.findOne({ email: object.email }, (err, data) => {
            return err ? callback(err, null) : data == null ? callback("Email ID isn't present", null) : callback(null, data);
        });
    };

    //To register an user
    createUser = (object,callback) => {
        encryptPassword = bcrypt.hashSync(object.password, 10);
        const newUser = new User({
            firstName: object.firstName,
            lastName: object.lastName,
            email: object.email,
            phNumber: object.phNumber,
            password: encryptPassword,
        });
        // Save user in the database
        return newUser.save((err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    };

    //To find all the users
    findUser = (callback) => {
        return User.find((err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    }

    //query to find a single user
    findOneUser = (email, callback) => {
        User.findById({ email: email }, (err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    }

    // Find user and update his/her details with the request body
    updateUser = (findId, object, callback) => {
        User.findByIdAndUpdate(findId, { firstName: object.firstName, lastName: object.lastName, email: object.email, phNumber: object.phNumber }, { new: true },
            (err, data) => {
                return err ? callback(err, null) : callback(null, data);
            });
    }

    //query to delete a note
    deleteUser = (findId, callback) => {
        User.findByIdAndRemove(findId, (err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    }

    //Forgot password
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

    //reset password
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