const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: {type: String, required: true}, 
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phNumber: {type: String, required: true},
    password: {type: String},
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

class userModels {
    //user login
    loginUser = (object, callback) => {
        return User.findOne({ email: object.email }, (err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    };

    //To register an user
    createUser = (object) => {
        const newUser = new User({
            firstName: object.firstName,
            lastName: object.lastName,
            email: object.email,
            phNumber: object.phNumber,
            password: object.password
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
    findOneUser = (findId, callback) => {
        User.findById(findId, (err, data) => {
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
}

module.exports = new userModels();