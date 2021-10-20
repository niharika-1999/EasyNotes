const express = require('express');
const router = express.Router();
const userOperations = require('../controllers/users/user.controller');
const validateName = require('../middleware/user.middleware');
const { body } = require("express-validator");

//User Login
router.post("/login", userOperations.loginUser);

// Create a new user
router.post('/',
    body("firstName")
        .matches("^[A-Z][a-zA-Z]{2,}")
        .withMessage("Please enter a valid name with first letter capital."),
    body("lastName")
        .matches("^[A-Z][a-zA-Z]{2,}")
        .withMessage("Please enter a valid name with first letter capital."),
    body("email").isEmail().withMessage("Enter a valid Email"),
    body("phNumber")
        .matches("^91 [1-9][0-9]{9}$")
        .withMessage("Please enter a valid contact number."),
    userOperations.createUser);

// Retrieve all users
router.get('/', userOperations.findAll);

// Retrieve a single user with userId
router.get('/:userId', userOperations.findOneUser);

// Update a user with userId
router.put('/:userId',
    body("firstName")
        .matches("^[A-Z][a-zA-Z]{2,}")
        .withMessage("Please enter a valid name with first letter capital."),
    body("lastName")
        .matches("^[A-Z][a-zA-Z]{2,}")
        .withMessage("Please enter a valid name with first letter capital."),
    body("email").isEmail().withMessage("Enter a valid Email"),
    body("phNumber")
        .matches("^91 [1-9][0-9]{9}$")
        .withMessage("Please enter a valid contact number."),
    userOperations.update);

// Delete a user with userId
router.delete('/:userId', userOperations.delete);

module.exports = router;