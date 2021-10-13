const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phNumber: String
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

class userModels {
    createUser = (object) => {
        const newUser = new User({
            firstName: object.firstName,
            lastName: object.lastName,
            email: object.email,
            phNumber: object.phNumber
        });
        // Save user in the database
        return newUser.save();
    };

    //To find all the users
    findUser = () => {
        return User.find();
    }

    //query to find a single user
    findOneUser = (findId) => {
        return User.findById(findId);
    }

    // Find user and update his/her details with the request body
    updateUser = (findId, object) => {
        return User.findByIdAndUpdate(findId, { firstName: object.firstName, lastName: object.lastName, email: object.email, phNumber: object.phNumber }, { new: true });
    }

    //query to delete a note
    deleteUser = (findId) => {
        return User.findByIdAndRemove(findId);
    }
}

module.exports = new userModels();
