const noteService = require('../../service/note.service');
const dtoObj = require("./note.responseSchema");
let responseObject;

class noteOperations {
    // Create and Save a new Note
    create = (req, res) => {
        let body = req.body;
        noteService.createANewNote(body, (err, data) => {
            if (err) {
                responseObject = dtoObj.noteApiFailure;
                responseObject.message = err.message;
                res.send(responseObject);
            }
            responseObject = dtoObj.noteApiSuccess;
            responseObject.message = data;
            res.send(responseObject);
        });
    };

    // Retrieve and return all notes from the database.
    findNotes = (req, res) => {
        noteService.findAllNotes((err, data) => {
            if (err) {
                responseObject = dtoObj.noteApiFailure;
                responseObject.message = err.message;
                res.send(responseObject);
            }
            responseObject = dtoObj.noteApiSuccess;
            responseObject.message = data;
            res.send(responseObject);
        });
    };

    // Find a single note with a noteId
    findOne = (req, res) => {
        let id = req.params.noteId;
        noteService.findOnlyOneNote(id, (err, data) => {
            if (err) {
                if (err.kind === "ObjectId") {
                    responseObject = dtoObj.noteApiFindFailure;
                    responseObject.message = err.message;
                    res.send(responseObject);
                }
                responseObject = dtoObj.noteApiFailure;
                responseObject.message = err.message;
                res.send(responseObject);
            }
            if (!data) {
                responseObject = dtoObj.noteApiFindFailure;
                res.send(responseObject);
            }
            responseObject = dtoObj.noteApiSuccess;
            responseObject.message = data;
            res.send(responseObject);
        });
    };

    // Update a note identified by the noteId in the request
    update = (req, res) => {
        let id = req.params.noteId;
        let body = req.body;
        noteService.updateANote(id, body, (err, data) => {
            if (err) {
                if (err.kind === "ObjectId") {
                    responseObject = dtoObj.noteApiFindFailure;
                    responseObject.message = err.message;
                    res.send(responseObject);
                }
                responseObject = dtoObj.noteApiFailure;
                responseObject.message = err.message;
                res.send(responseObject);
            }
            if (!data) {
                responseObject = dtoObj.noteApiFindFailure;
                res.send(responseObject);
            }
            responseObject = dtoObj.noteApiSuccess;
            responseObject.message = data;
            res.send(responseObject);
        });
    };

    // Delete a note with the specified noteId in the request
    delete = (req, res) => {
        let id = req.params.noteId;
        noteService.deleteANote(id, (err, data) => {
            if (err) {
                if (err.kind === "ObjectId") {
                    responseObject = dtoObj.noteApiFindFailure;
                    responseObject.message = err.message;
                    res.send(responseObject);
                }
                responseObject = dtoObj.noteApiFailure;
                responseObject.message = err.message;
                res.send(responseObject);
            }
            if (!data) {
                responseObject = dtoObj.noteApiFindFailure;
                res.send(responseObject);
            }
            responseObject = dtoObj.noteApiSuccess;
            responseObject.message = " Note deleted.";
            res.send(responseObject);
        });
    };
}
module.exports = new noteOperations();