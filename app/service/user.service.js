const userModels = require('../models/user.model');

class userService {
    createANewUser = (object) => {
        userModels.createUser(object);
        return userModels.createUser(object);
    }

    //query to find all users
    findAllUsers = () => {
        userModels.findUser();
        return userModels.findUser();
    }

    //query to find a single user
    findOnlyOneUser = (findId) => {
        userModels.findOneUser(findId);
        return userModels.findOneUser(findId);
    }

    // Find an user and update his/her details with the request body
    updateAUser = (findId, object) => {
        userModels.updateUser(findId, object, { new: true });
        return userModels.updateUser(findId, object);
    }

    //query to delete an user
    deleteAUser = (findId) => {
        userModels.deleteUser(findId);
        return userModels.deleteUser(findId);
    }
}

module.exports = new userService();