/*
 * @description     : Testing CRUD operations on labels using Mocha and Chai
 * @file            : labels.js
 * @author          : Niharika Rao
 * @since           : 08-12-2021
 */
require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
chai.use(chaiHttp);
const expect = chai.expect;

/**
 * @description CRUD testing for labels in FundooNotes
 */
describe("CRUD OPERATIONS ON LABLES", () => {
  let token = "";

  /**
   * /POST request test
   * @description To check if the user credentials are valid and token is generated for notes
   */
  it("Should be passed when a user logs in", async () => {
    let res = await chai
      .request(server)
      .post("/users/login")
      .send({ email: "example.1234@gmail.com", password: "Password@789" });
    res.should.have.status(200);
    token = res.body.message.Token;
  });

   /**
   * /POST request test
   * @description  Positive case to check the validation of labels into the database 
   */
    it("Should pass when valid label is added to the database", async () => {
        var labels = {
          title: "Label CRUD check",
        };
        let res = await chai
          .request(server)
          .post("/labels")
          .auth(token, { type: "bearer" })
          .send(labels);
        res.should.have.status(200);
        console.log("Response Body:", res.body);
      });

      /**
   * /POST request test
   * @description Negative case to check the validation of labels into the database
   */
  it("Should pass when an invalid label is added to the database", async () => {
    var labels = {
      title: " ",
    };
    let res = await chai
      .request(server)
      .post("/labels")
      .auth(token, { type: "bearer" })
      .send(labels);
    res.should.have.status(400);
    console.log("Response Body:", res.body);
  });

  /**
   * /GET request test
   * @description To get all the notes from database
   */
   it("Should pass when all the labels are retrieved", async () => {
    let res = await chai
      .request(server)
      .get("/labels")
      .auth(token, { type: "bearer" });
    res.should.have.status(200);
    console.log(res.body);
    expect(res.body).to.have.a.lengthOf(12);
  });

  /**
   * /GET request test
   * @description To check if a particular label is being fetched or not
   */
   it("Should pass when a particular label is fetched", (done) => {
    chai
      .request(server)
      .get("/labels/61b02b5db126e667c5418426")
      .auth(token, { type: "bearer" })
      .end((err, result) => {
        result.should.have.status(200);
        console.log(
          "Fetched Particlar label using /GET/Labels/:LabelID ::::",
          result.body
        );
        done();
      });
  });

  /**
   * /PUT request test
   * @description To check the validation of labels into the database
   */
   it("Should pass when a particular label is updated", (done) => {
    chai
      .request(server)
      .put("/labels/61af59d2b54578d734badaaa")
      .auth(token, { type: "bearer" })
      .send({ title: "FundooLabel" })
      .end((err, result) => {
        result.should.have.status(200);
        console.log(
          "Updated Particlar label using /PUT/Labels/:LABELID  ::::",
          result.body
        );
        done();
      });
  });

   /**
   * /DELETE request test
   * @description To check the deletion of labels in the database
   */
    it("Should pass when a particular label is deleted", (done) => {
        chai
          .request(server)
          .delete("/labels/61af5913b54578d734badaa6")
          .auth(token, { type: "bearer" })
          .end((err, result) => {
            result.should.have.status(200);
            console.log("Deleted Particlar label ", result.body);
            done();
          });
      });
    
      /**
       * /GET request test
       * @description To check the number of documents after deleting
       */
      it("Should pass when the number of documents after deleting from the database is same.", (done) => {
        chai
          .request(server)
          .get("/labels/")
          .auth(token, { type: "bearer" })
          .end((err, result) => {
            result.should.have.status(200);
            console.log("Got", result.body.length, " docs");
            done();
          });
      });
    });