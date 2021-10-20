const userModels = require('../models/user.model');
const jwtHelper = require("../../utils/jwt");

class userService {
    loginUser = (object, callback) => {
        userModels.loginUser(object, (err, data) => {
            if (err) {
                return callback(err, null);
            } else {
                if (object.password == data.password) {
                    var token = jwtHelper.generateToken(object.email);
                    var result = data + "Token:" + token;
                    return callback(null, result);
                } else {
                    return callback("Mismatch in Password");
                }
            }
        });
    };

    createANewUser = (object, callback) => {
        userModels.createUser(object, (err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    }

    //query to find all users
    findAllUsers = (callback) => {
        userModels.findUser((err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    }

    //query to find a single user
    findOnlyOneUser = (findId, callback) => {
        userModels.findOneUser(findId, (err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    }

    // Find an user and update his/her details with the request body
    updateAUser = (findId, object, callback) => {
        userModels.updateUser(findId, object, (err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    }

    //query to delete an user
    deleteAUser = (findId, callback) => {
        userModels.deleteUser(findId, (err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    }
}

module.exports = new userService();