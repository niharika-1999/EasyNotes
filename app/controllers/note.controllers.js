const logger = require('../../winstonLogger');
const noteService = require('../service/note.service');

class noteOperations {
    // Create and Save a new Note
    create = (req, res) => {
        noteService.createANewNote(req.body.title, req.body.content)
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

    // Retrieve and return all notes from the database.
    findNotes = (req, res) => {
        noteService.findAllNotes()
            .then(notes => {
                logger.info(" Retrieving all notes from the database.");
                res.send(notes);
            }).catch(err => {
                logger.error("Internal Server Error.");
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving notes."
                });
            });
    };

    // Find a single note with a noteId
    findOne = (req, res) => {
        noteService.findOnlyOneNote(req.params.noteId)
            .then(note => {
                if (!note) {
                    return res.status(404).send({
                        message: "Note not found with id " + req.params.noteId
                    });
                }
                res.send(note);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    logger.error("Error 404: Not found.");
                    return res.status(404).send({
                        message: "Note not found with id " + req.params.noteId
                    });
                }
                logger.error("Error 500: Internal Server Error.");
                return res.status(200).send({
                    message: "Error retrieving note with id " + req.params.noteId
                });
            });
    };

    // Update a note identified by the noteId in the request
    update = (req, res) => {
        let id = req.params.noteId;
        let title = req.body.title;
        let content = req.body.content;
        noteService.updateANote(id, title, content)
            .then(note => {
                res.send(note);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    logger.error("Error 404: Not found.");
                    return res.status(404).send({
                        message: "Note not found with id " + req.params.noteId
                    });
                }
                logger.error("Error 500: Internal Server Error.");
                return res.status(200).send({
                    message: "Error updating note with id " + req.params.noteId
                });
            });
    };

    // Delete a note with the specified noteId in the request
    delete = (req, res) => {
        noteService.deleteANote(req.params.noteId)
            .then(note => {
                if (!note) {
                    logger.error("Error 404: Note not found");
                    return res.status(404).send({
                        message: "Note not found with id " + req.params.noteId
                    });
                }
                logger.info("Note deleted");
                res.send({ message: "Note deleted successfully!" });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "Note not found with id " + req.params.noteId
                    });
                }
                logger.error("Error 500: Internal Server Error.");
                return res.status(200).send({
                    message: "Could not delete note with id " + req.params.noteId
                });
            });
    };
}
module.exports = new noteOperations();