/*
 * @description     : Testing CRUD operations on users using Mocha and Chai
 * @file            : users.js
 * @author          : Niharika Rao
 * @since           : 08-12-2021
 */
require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
chai.use(chaiHttp);

/**
 * @description CRUD testing for users in FundooNotes
 */
describe("CRUD OPERATIONS FOR USERS", function () {
  const users = [
    {
      firstName: "Navya",
      lastName: "Singh",
      password: "Navyasingh@1999",
      email: "navyasingh19@gmail.com",
    },
    {
      firstName: "Nihar",
      lastName: " ",
      password: "Niharika@1234",
      email: "niharrao19@gmail.com",
    },
  ];

  /**
   * /POST request test
   * @description Checking for positive and negative test cases of validation for user details
   */
  it("Should create a user and add the data in database", (done) => {
    for (u in users) {
      chai
        .request(server)
        .post("/users")
        .send(users[u])
        .end((err, res) => {
          res.should.have.status(200);
          console.log("Response Body:", res.body);
        });
    }
    done();
  });

  /**
   * /GET request test
   * @description Checking if all the users can be retrieved or not
   */
  it("Should Retrieve all the users present in database", (done) => {
    chai
      .request(server)
      .get("/users")
      .end((err, result) => {
        result.should.have.status(200);
        console.log("Result Body:", result.body);
        done();
      });
  });

  /**
   * /PUT request test
   * @description Checking for test cases of updating user details.
   */
   it("Should Update a particular user", (done) => {
    var updatedUser = {
      firstName: "Niharrrrrr",
      lastName: "Rao",
      password: "Niharika@1234",
      email: "niharrao19@gmail.com",
    };
    chai
      .request(server)
      .put("/users/61aefdc8b7f1c9482c31397b")
      .send(updatedUser)
      .end((err, result) => {
        result.should.have.status(200);
        console.log(
          "Updated Particlar User using /GET/UserS/:USERID :",
          result.body
        );
        done();
      });
  });

  /**
   * /GET request test
   * @description Checking if the updated user details is sent to database or not
   */
   it("Should check if the new data is updated in database", (done) => {
    chai
      .request(server)
      .get("/users/61aefdc8b7f1c9482c31397b")
      .end((err, result) => {
        result.should.have.status(200);
        result.body.message.firstName.should.eq("Niharrrrrr");
        console.log(
          "Fetched Particlar user using /GET/USERS/:USERID :",
          result.body
        );
        done();
      });
  });

  /**
   * /DELETE request test
   * @description Checking for test cases of deleting a particular user
   */
   it("Should check if a particuar user is deleted", (done) => {
    chai
      .request(server)
      .delete("/users/6180ee510c6e4d7f01373c20")
      .end((err, result) => {
        result.should.have.status(200);
        console.log(
          "Deleted a particlar user using /DELETE/USERS/:USERID:",
          result.body
        );
        done();
      });
  });

  /**
   * /POST request test
   * @description Checking for validation of user credentials for login
   */
  it("Should be success if the login credentials are valid", (done) => {
    chai.request(server)
      .post("/users/login")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({ email: "example.1234@gmail.com", password: "Password@789" })
      .end((err, result) => {
        result.should.have.status(200);
        console.log(
          "Successfully logged in.");
        done();
      });
  }); 
});