const logger = require('../../../config/winstonLogger');
const userService = require('../../service/user.service');
const {validationResult} = require('express-validator');
const dtoObj = require("./user.responseSchema");
let responseObject;

class userOperations {
    //For user to login
    loginUser = (req, res) => {
        let object = req.body;
        userService.loginUser(object, (err, data) => {
            if (err) {
                logger.error(err);
                responseObject = dtoObj.userApiFailure;
                responseObject.message = err;
                return res.send(responseObject);
            }
            logger.info("Successfully logged in");
            responseObject = dtoObj.userApiSuccess;
            responseObject.message = data;
            res.send(responseObject);
        });
    };

    // Create and Save a new user
    createUser = (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            responseObject = dtoObject.userApiFailure;
            responseObject.message = errors.array();
            res.send(responseObject);
        }
        let object = req.body;
        userService.createANewUser(object, (err, data) => {
            if (err) {
                logger.error(err);
                responseObject = dtoObj.userApiFailure;
                responseObject.message = err.message;
                res.send(responseObject);
            }
            logger.info("Registeration Successful");
            responseObject = dtoObj.userApiSuccess;
            responseObject.message = data;
            res.send(responseObject);
        });
    };

    // Retrieve and return all users from the database.
    findAll = (req, res) => {
        userService.findAllUsers((err, data) => {
            if (err) {
              logger.error(err);
              responseObject = dtoObj.userApiFailure;
              responseObject.message = err.message;
              res.send(responseObject);
            }
            logger.info("Successfully retrived all the users.");
            responseObject = dtoObj.userApiSuccess;
            responseObject.message = data;
            res.send(responseObject);
          });
    };

    // Find a single user with a userId
    findOneUser = (req, res) => {
        let email = req.params.userId;
        userService.findOnlyOneUser(email, (err, data) => {
            if (err) {
                logger.error(err);
                if (err.kind === "ObjectId") {
                    responseObject = dtoObj.userApiFindFailure;
                    responseObject.message = err.message;
                    res.send(responseObject);
                }
                responseObject = dtoObj.userApiFailure;
                responseObject.message = err.message;
                res.send(responseObject);
            }
            if (!data) {
                responseObject = dtoObj.userApiFindFailure;
                res.send(responseObject);
            }
            logger.info("Successfully retrieved");
            responseObject = dtoObj.userApiSuccess;
            responseObject.message = data;
            res.send(responseObject);
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
        userService.updateAUser(id, object, (err, data) => {
            if (err) {
                logger.error(err);
                if (err.kind === "ObjectId") {
                    responseObject = dtoObj.userApiFindFailure;
                    responseObject.message = err.message;
                    res.send(responseObject);
                }
                responseObject = dtoObj.userApiFailure;
                responseObject.message = err.message;
                res.send(responseObject);
            }
            if (!data) {
                responseObject = dtoObj.userApiFindFailure;
                res.send(responseObject);
            }
            logger.info("Succesfully updated");
            responseObject = dtoObj.userApiSuccess;
            responseObject.message = "Succesfully updated";
            res.send(responseObject);
        });
    };

    // Delete a note with the specified noteId in the request
    delete = (req, res) => {
        let id = req.params.userId;
        userService.deleteAUser(id, (err, data) => {
            if (err) {
                logger.error(err);
                if (err.kind === "ObjectId") {
                    responseObject = dtoObj.userApiFindFailure;
                    responseObject.message = err.message;
                    res.send(responseObject);
                }
                responseObject = dtoObj.userApiFailure;
                responseObject.message = err.message;
                res.send(responseObject);
            }
            if (!data) {
                responseObject = dtoObj.userApiFindFailure;
                res.send(responseObject);
            }
            logger.info("Deleted succesfully");
            responseObject = dtoObj.userApiSuccess;
            responseObject.message = "Deleted successfully";
            res.send(responseObject);
        });
    };

    //If the user forgets password
    forgotPassword = (req, res) => {
        let email = req.body.email;
        userService
            .forgotPassword(email)
            .then((data) => { res.send("Result:" + data); })
            .catch((err) => {
                console.log("error:" + err);
                res.send(err);
            });
    };

    //Reset Password
    resetPassword = (req, res) => {
        let token = req.params.token;
        let password = req.body.password;
        userService
            .resetPassword(token, password)
            .then((data) => {
                res.json({ message: "Password updated successfully", "Result:": data });
            })
            .catch((err) => {
                console.log("error:" + err);
                res.send(err);
            });
    };
}
module.exports = new userOperations();