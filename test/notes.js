
/*
 * @description     : Testing CRUD operations on notes using Mocha and Chai
 * @file            : notes.js
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
 * @description CRUD testing for notes in FundooNotes App
 */
describe("CRUD OPERATIONS ON NOTES", function () {
  let token = "";

  /**
   * /POST request test
   * @description To check if the user credentials are valid and token is generated for notes
   */
  it("Should pass if login credentials are valid", async () => {
    let res = await chai
      .request(server)
      .post("/users/login")
      .send({ email: "example.1234@gmail.com", password: "Password@789" });
    res.should.have.status(200);
    token = res.body.message.Token;
  });

  /**
   * /POST request test
   * @description To validate the title and content of notes - Positive case
   */
  it("Should pass if a valid note is added to database", async () => {
    var notes = {
      title: "Themed Restaurant BANGALORE",
      content: "Gufha(Cave theme) Hunger Camp(Army theme) Stonny Brook(Water theme) FlyDining(Dine in Sky) Serengeti(Jungle theme)",
      isTrash: false,
      color: "red",
    };
    let res = await chai
      .request(server)
      .post("/notes")
      .auth(token, { type: "bearer" })
      .send(notes);
    res.should.have.status(200);
    console.log("Response Body:", res.body);
  });

  /**
   * /POST request test
   * @description To validate the title and content of notes - Negative case
   */
  it("Should pass if invalid title and content are passed to notes", async () => {
    var notesErr = [
      {
        title: " ",
        content: " ",
        isTrash: false,
        color: "red",
      },
    ];
    let res = await chai
      .request(server)
      .post("/notes")
      .auth(token, { type: "bearer" })
      .send(notesErr);
    res.should.have.status(400);
    console.log("Response Body:", res.body);
  });

  /**
   * /DELETE request test
   * @description To check if a particular note is getting deleted or not
   */
  it("Should pass when a particular note with a noteId is deleted", (done) => {
    chai
      .request(server)
      .delete("/notes/619cd5304572a0d71c4674b6")
      .auth(token, { type: "bearer" })
      .end((err, result) => {
        result.should.have.status(200);
        console.log("Deleted Particlar note ", result.body);
        done();
      });
  });

  /**
   * /GET request test
   * @description To check the number of documents after deleting
   */
  it("Should pass only when the number of documents after deleting from database is the same", (done) => {
    chai
      .request(server)
      .get("/notes/")
      .auth(token, { type: "bearer" })
      .end((err, result) => {
        result.should.have.status(200);
        console.log("Total notes in the database: ", result.body.length);
        done();
      });
  });
});