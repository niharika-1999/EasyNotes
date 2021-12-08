/**
 * @file            : user.controller.js
 * @author          : Niharika Rao
 * @since           : 15-10-2021
 */

const logger = require('../../../config/winstonLogger');
const userService = require('../../service/user.service');
const {validationResult} = require('express-validator');
const dtoObj = require("./user.responseSchema");
let responseObject;

class userOperations {
   /**
   * @description handles request response for authenticating the user
   * @param {Object} req
   * @param {Object} res
   * @param {Object} responseObject
   */
    loginUser = (req, res) => {
        let object = req.body;
        console.log(object);
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
            return res.send(responseObject);
        });
    };

    /**
   * @description Creates and saves the new user
   * @param {Object} req
   * @param {Object} res
   * @param {Object} responseObject
   */
    createUser = (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            responseObject = dtoObj.userApiFailure;
            responseObject.message = errors.array();
            return res.send(responseObject);
        }
        let object = req.body;
        userService.createANewUser(object, (err, data) => {
            if (err) {
                logger.error(err);
                responseObject = dtoObj.userApiFailure;
                responseObject.message = err.message;
                return res.send(responseObject);
            }
            logger.info("Registeration Successful");
            responseObject = dtoObj.userApiSuccess;
            responseObject.message = data;
            return res.send(responseObject);
        });
    };
    /**
   * @description Retrieve and return all users from the database.
   * @param {Object} req
   * @param {Object} res
   * @param {Object} responseObject
   */
    findAll = (req, res) => {
        userService.findAllUsers((err, data) => {
            if (err) {
              logger.error(err);
              responseObject = dtoObj.userApiFailure;
              responseObject.message = err.message;
              return res.send(responseObject);
            }
            logger.info("Successfully retrived all the users.");
            responseObject = dtoObj.userApiSuccess;
            responseObject.message = data;
            return res.send(responseObject);
          });
    };
    /**
   * @description Find a single user with a userId
   * @param {Object} req
   * @param {Object} res
   * @param {Object} responseObject
   */
     findOneUser = (req, res) => {
        let findId = req.params.userId;
        userService
          .findOnlyOneUser(findId)
          .then((data) => {
            responseObject = dtoObj.userApiSuccess;
            responseObject.message = data;
            res.send(responseObject);
          })
          .catch((err) => {
            if (err.kind === "ObjectId") {
              logger.error("user not found with id");
              responseObject = dtoObj.userApiFindFailure;
              res.send(responseObject);
            }
            responseObject = dtoObj.userApiFailure;
            responseObject.message = err.message;
            res.send(responseObject);
          });
      };
     /**
   * @description Update a user detail identified by the userId in the request
   * @param {Object} req
   * @param {Object} res
   */
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
                    return res.send(responseObject);
                }
                responseObject = dtoObj.userApiFailure;
                responseObject.message = err.message;
                return res.send(responseObject);
            }
            if (!data) {
                responseObject = dtoObj.userApiFindFailure;
                return res.send(responseObject);
            }
            logger.info("Succesfully updated");
            responseObject = dtoObj.userApiSuccess;
            responseObject.message = "Succesfully updated";
            return res.send(responseObject);
        });
    };
    /**
   * @description Delete a note with the specified noteId in the request
   * @param {Object} req
   * @param {Object} res
   */
    delete = (req, res) => {
        let id = req.params.userId;
        userService.deleteAUser(id, (err, data) => {
            if (err) {
                logger.error(err);
                if (err.kind === "ObjectId") {
                    responseObject = dtoObj.userApiFindFailure;
                    responseObject.message = err.message;
                    return res.send(responseObject);
                }
                responseObject = dtoObj.userApiFailure;
                responseObject.message = err.message;
                return res.send(responseObject);
            }
            if (!data) {
                responseObject = dtoObj.userApiFindFailure;
                res.send(responseObject);
            }
            logger.info("Deleted succesfully");
            responseObject = dtoObj.userApiSuccess;
            responseObject.message = "Deleted successfully";
            return res.send(responseObject);
        });
    };

    /**
   * @description handles request response for forgot password route
   * @param {Object} req
   * @param {Object} res
   */
    forgotPassword = (req, res) => {
        let email = req.body.email;
        userService
            .forgotPassword(email)
            .then((data) => { return res.send("Result:" + data); })
            .catch((err) => {
                return res.send(err);
            });
    };

    /**
   * @description handles request response for password reset
   * @param {Object} req
   * @param {Object} res
   */
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
                return res.send(err);
            });
    };
}
module.exports = new userOperations();