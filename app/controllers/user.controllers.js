const logger = require('../../winstonLogger');
const userService = require('../service/user.service');
const {validationResult} = require('express-validator');

class userOperations {
    // Create and Save a new user
    createUser = (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let object = req.body;
        userService.createANewUser(object)
            .then(data => {
                logger.info("New Entry Added.");
                res.send(data);
            }).catch(err => {
                logger.error("Internal Server Error.");
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Note."
                });
            });
    };

    // Retrieve and return all users from the database.
    findAll = (req, res) => {
        userService.findAllUsers()
            .then(users => {
                logger.info(" Retrieving the list of users from the database.");
                res.send(users);
            }).catch(err => {
                logger.error("Internal Server Error.");
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving users."
                });
            });
    };

    // Find a single user with a userId
    findOneUser = (req, res) => {
        userService.findOnlyOneUser(req.params.userId)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: "User not found with id " + req.params.userId
                    });
                }
                res.send(user);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    logger.error("Error 404: Not found.");
                    return res.status(404).send({
                        message: "User not found with id " + req.params.userId
                    });
                }
                logger.error("Error 500: Internal Server Error.");
                return res.status(200).send({
                    message: "Error retrieving user with id " + req.params.userId
                });
            });
    };

    // Update a user detail identified by the userId in the request
    update = (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let id = req.params.userId;
        let object = req.body;
        userService.updateAUser(id, object)
            .then(user => {
                res.send(user);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    logger.error("Error 404: Not found.");
                    return res.status(404).send({
                        message: "User not found with id " + req.params.userId
                    });
                }
                logger.error("Error 500: Internal Server Error.");
                return res.status(200).send({
                    message: "Error updating user with id " + req.params.userId
                });
            });
    };

    // Delete a note with the specified noteId in the request
    delete = (req, res) => {
        userService.deleteAUser(req.params.userId)
            .then(user => {
                if (!user) {
                    logger.error("Error 404: User not found");
                    return res.status(404).send({
                        message: "User not found with id " + req.params.userId
                    });
                }
                logger.info("User deleted");
                res.send({ message: "User deleted successfully!" });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "User not found with id " + req.params.userId
                    });
                }
                logger.error("Error 500: Internal Server Error.");
                return res.status(200).send({
                    message: "Could not delete user with id " + req.params.userId
                });
            });
    };
}
module.exports = new userOperations();